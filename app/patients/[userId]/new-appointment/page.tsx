import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import FormLayout from "@/components/FormLayout";
const FormLayoutProps = {
  imageSrc: "/assets/images/appointment-img.png",
  imageClasses: "max-w-[390px] bg-bottom",
  className: "max-w-[860px]",
  isAdmin: false,
};

export default async function Appointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);
  return (
    <FormLayout {...FormLayoutProps}>
      <AppointmentForm patientId={patient?.$id} userId={userId} type="create" />
    </FormLayout>
  );
}
