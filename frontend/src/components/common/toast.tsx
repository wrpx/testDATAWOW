type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps) {
  return (
    <div className="fixed right-4 top-4 z-40 rounded-md border border-[#B6D8B6] bg-[#DBF1DC] px-4 py-3 text-sm font-medium text-[#3D7A3D] shadow-panel sm:right-6 sm:top-6">
      {message}
    </div>
  );
}
