import { z } from "zod";

const minMaxString = (min: number, max: number, fieldName: string) =>
  z
    .string()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} must be at most ${max} characters`);

const phoneValidation = z
  .string()
  .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number");

const consentValidation = (message: string) =>
  z
    .boolean()
    .default(false)
    .refine((value) => value === true, { message });

export const UserFormValidation = z.object({
  name: minMaxString(2, 50, "Name"),
  email: z.string().email("Invalid email address"),
  phone: phoneValidation,
});

export const PatientFormValidation = z.object({
  name: minMaxString(2, 50, "Name"),
  email: z.string().email("Invalid email address"),
  phone: phoneValidation,
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female"]),
  address: minMaxString(5, 500, "Address"),
  occupation: minMaxString(2, 500, "Occupation"),
  emergencyContactName: minMaxString(2, 50, "Contact name"),
  emergencyContactNumber: phoneValidation,
  primaryPhysician: minMaxString(2, 50, "Primary physician"),
  insuranceProvider: minMaxString(2, 50, "Insurance name"),
  insurancePolicyNumber: minMaxString(2, 50, "Policy number"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: consentValidation(
    "You must consent to treatment in order to proceed"
  ),
  disclosureConsent: consentValidation(
    "You must consent to disclosure in order to proceed"
  ),
  privacyConsent: consentValidation(
    "You must consent to privacy in order to proceed"
  ),
});



export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: minMaxString(2, 500, "Reason"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: minMaxString(2, 500, "Reason"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
