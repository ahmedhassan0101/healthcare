import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

// Validate required environment variables
if (!ENDPOINT || !PROJECT_ID || !API_KEY) {
  throw new Error(
    "Missing required environment variables. Please check NEXT_PUBLIC_ENDPOINT, PROJECT_ID, and API_KEY"
  );
}

if (
  !DATABASE_ID ||
  !PATIENT_COLLECTION_ID ||
  !DOCTOR_COLLECTION_ID ||
  !APPOINTMENT_COLLECTION_ID ||
  !BUCKET_ID
) {
  throw new Error(
    "Missing required collection or database IDs in environment variables"
  );
}


// Create and configure client
const client = new sdk.Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

// Initialize services
export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);


