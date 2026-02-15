import { CheckCircleIcon, XIcon } from "@/components/common/icons";

type ToastProps = {
  message: string;
  tone?: "success" | "error";
};

const toneStyles = {
  success: "border-[#B6D8B6] bg-[#DBF1DC] text-[#3D7A3D]",
  error: "border-[#E7B7B7] bg-[#FBE3E3] text-[#A63A3A]"
};

export function Toast({ message, tone = "success" }: ToastProps) {
  return (
    <div
      className={`fixed right-4 top-4 z-40 flex items-center gap-3 rounded-md border px-4 py-3 text-sm font-medium shadow-panel sm:right-6 sm:top-6 ${toneStyles[tone]}`}
    >
      <CheckCircleIcon className="h-4 w-4 shrink-0" />
      <span>{message}</span>
      <XIcon className="h-4 w-4 shrink-0 opacity-70" />
    </div>
  );
}
