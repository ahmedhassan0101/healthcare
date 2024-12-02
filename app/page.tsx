import FormLayout from "@/components/FormLayout";
import PatientForm from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const FormLayoutProps = {
  imageSrc: "/assets/images/onboarding-img.png",
  imageClasses: "max-w-[50%]",
  className: "max-w-[496px]",
  isAdmin: true,
};

export default function Home() {
  return (
    <FormLayout {...FormLayoutProps}>
      <PasskeyModal />
      <PatientForm />
    </FormLayout>
  );
}
