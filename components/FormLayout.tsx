import Image from "next/image";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  isAdmin?: boolean;
  imageSrc: string;
  imageClasses: string;
  className: string;
};

export default function FormLayout({
  children,
  isAdmin,
  imageSrc,
  imageClasses,
  className,
}: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className={`sub-container flex-1 flex-col py-10 ${className}`}>
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
            priority
          />
          {children}
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="copyright">© {currentYear} CarePluse</p>
            {isAdmin && (
              <Link href="/?admin=true" className="text-green-500">
                Admin
              </Link>
            )}
          </div>
        </div>
      </section>
      <Image
        src={imageSrc}
        height={1000}
        width={1000}
        alt="patient"
        className={`side-img ${imageClasses}`}
        priority
      />
    </div>
  );
}
