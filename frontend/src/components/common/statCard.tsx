import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: number;
  tone: "info" | "success" | "danger";
  icon: ReactNode;
};

const toneMap = {
  info: "bg-app-info",
  success: "bg-app-success",
  danger: "bg-app-danger"
};

export function StatCard({ title, value, tone, icon }: StatCardProps) {
  return (
    <article className={`rounded-lg p-6 text-white ${toneMap[tone]}`}>
      <div className="mb-2 flex justify-center text-white">{icon}</div>
      <p className="text-center text-xl font-medium">{title}</p>
      <p className="mt-3 text-center text-5xl font-medium leading-none">{value.toLocaleString()}</p>
    </article>
  );
}
