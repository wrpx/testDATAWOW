import { CheckCircleIcon, XIcon } from "@/components/common/icons";

type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps) {
  return (
    <div className="fixed right-4 top-4 z-40 flex items-center gap-3 rounded-md border border-[#B6D8B6] bg-[#DBF1DC] px-4 py-3 text-sm font-medium text-[#3D7A3D] shadow-panel sm:right-6 sm:top-6">
      <CheckCircleIcon className="h-4 w-4 shrink-0" />
      <span>{message}</span>
      <XIcon className="h-4 w-4 shrink-0 opacity-70" />
    </div>
  );
}
