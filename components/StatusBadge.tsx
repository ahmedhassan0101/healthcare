import clsx from "clsx";
import Image from "next/image";

const statusMapping = {
  scheduled: {
    background: "bg-green-600",
    text: "text-green-500",
    icon: "/assets/icons/check.svg",
  },
  pending: {
    background: "bg-blue-600",
    text: "text-blue-500",
    icon: "/assets/icons/pending.svg",
  },
  cancelled: {
    background: "bg-red-600",
    text: "text-red-500",
    icon: "/assets/icons/cancelled.svg",
  },
};

export const StatusBadge = ({ status }: { status: Status }) => {
  const { background, text, icon } = statusMapping[status] || {};

  return (
    <div className={clsx("status-badge flex items-center gap-2", background)}>
      <Image
        src={icon}
        alt={`${status} status`}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p className={clsx("text-12-semibold capitalize", text)}>{status}</p>
    </div>
  );
};
