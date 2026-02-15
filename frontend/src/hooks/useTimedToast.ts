"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ToastTone = "success" | "error";

type ToastState = {
  message: string;
  tone: ToastTone;
};

export function useTimedToast(durationMs: number) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const showToast = useCallback(
    (message: string, tone: ToastTone = "success") => {
      setToast({ message, tone });

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => setToast(null), durationMs);
    },
    [durationMs]
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  return {
    toast,
    showToast
  };
}
