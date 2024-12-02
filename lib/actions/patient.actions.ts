/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  databases,
  ENDPOINT,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    if (error?.code === 409) {
      try {
        const existingUser = await users.list([
          Query.equal("email", user.email),
        ]);
        return existingUser.users[0] ?? null;
      } catch (listError) {
        throw listError;
      }
    }
    console.error("An error occurred while creating a new user:", error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
    throw error;
  }
};

const getFileUrl = (fileId: string) =>
  `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;

export const registerPatient = async ({
  identificationDocument,
  ...patientData
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument && identificationDocument.length > 0) {
      const blobFile = new Blob([identificationDocument[0]], {
        type: identificationDocument[0].type,
      });
      const inputFile = InputFile.fromBuffer(
        blobFile,
        identificationDocument[0].name
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }
    console.log("file", file);
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...patientData,
        identificationDocumentId: file?.$id ?? null,
        identificationDocumentUrl: file?.$id ? getFileUrl(file.$id) : null,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.error("Failed to create patient:", error);
    throw error;
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
