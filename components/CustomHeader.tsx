interface SectionProps {
  title?: string;
  subHeader?: string;
  description?: string;
}

export default function CustomHeader({
  title,
  description,
  subHeader,
}: SectionProps) {
  return (
    <>
      {subHeader ? (
        <div className="mb-9 space-y-1">
          <h2 className="sub-header">{subHeader}</h2>
        </div>
      ) : (
        <section className="mb-12 space-y-4">
          <h1 className="header">{title}</h1>
          <p className="text-dark-700">{description}</p>
        </section>
      )}
    </>
  );
}
