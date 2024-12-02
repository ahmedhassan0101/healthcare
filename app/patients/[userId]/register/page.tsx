import FormLayout from "@/components/FormLayout";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
const FormLayoutProps = {
  imageSrc: "/assets/images/register-img.png",
  imageClasses: "max-w-[390px]",
  className: "max-w-[860px]",
  isAdmin: false,
};
export default async function Register({ params }: SearchParamProps) {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <FormLayout {...FormLayoutProps}>
      <RegisterForm user={user} />
    </FormLayout>
  );
}
