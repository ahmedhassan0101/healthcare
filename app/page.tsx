import FormLayout from "@/components/FormLayout";
import PatientForm from "@/components/forms/PatientForm";

const FormLayoutProps = {
  imageSrc: "/assets/images/onboarding-img.png",
  imageClasses: "max-w-[50%]",
  className: "max-w-[496px]",
  isAdmin: true,
};

export default function Home() {
  return (
    <FormLayout {...FormLayoutProps}>
      <PatientForm />
    </FormLayout>
  );
}
