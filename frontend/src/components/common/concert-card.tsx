import type { ReactNode } from "react";
import { UserIcon } from "@/components/common/icons";
import { Concert } from "@/lib/types";

type ConcertCardProps = {
  concert: Concert;
  actionLabel: string;
  actionTone: "primary" | "danger";
  actionIcon?: ReactNode;
  onAction: (concertId: string) => void;
};

const actionToneMap = {
  primary: "bg-app-primary hover:opacity-90",
  danger: "bg-app-danger hover:opacity-90"
};

export function ConcertCard({
  concert,
  actionLabel,
  actionTone,
  actionIcon,
  onAction
}: ConcertCardProps) {
  return (
    <article className="rounded-lg border border-app-border bg-transparent p-5 sm:p-6 lg:p-8">
      <h3 className="text-3xl font-semibold text-app-primary sm:text-4xl">{concert.name}</h3>
      <div className="my-4 h-px bg-app-border" />
      <p className="text-base leading-relaxed text-app-text sm:text-lg">{concert.description}</p>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <p className="flex items-center gap-2 text-xl text-app-text">
          <UserIcon className="h-6 w-6" aria-hidden />
          <span>{concert.totalSeats.toLocaleString()}</span>
        </p>
        <button
          type="button"
          onClick={() => onAction(concert.id)}
          className={`inline-flex min-w-32 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-lg font-semibold text-white ${actionToneMap[actionTone]}`}
        >
          {actionIcon}
          {actionLabel}
        </button>
      </div>
    </article>
  );
}
