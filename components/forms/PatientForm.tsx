"use client";

import { UserFormValidation } from "@/lib/validation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { createUser } from "@/lib/actions/patient.actions";
import CustomHeader from "../CustomHeader";

type FormValues = z.infer<typeof UserFormValidation>;

export default function PatientForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async ({ name, email, phone }: FormValues) => {
    try {
      const newUser = await createUser({
        name,
        email,
        phone,
      });
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <CustomHeader
          title="Hi there 👋"
          description="Get started with appointments."
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />

        <SubmitButton
          buttonText="Get Started"
          isLoading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}

// const {
//   isSubmitting,    // During form submission
//   isSubmitted,     // After form submission
//   isSubmitSuccessful, // After successful submission
//   isValid,         // When all fields are valid
//   isDirty,         // When any field has changed
//   isValidating,    // During validation
// } = form.formState;
