"use client";

import { useForm } from "react-hook-form";

export type AdminCreateConcertFormValues = {
  name: string;
  description: string;
  totalSeats: number;
};

export function useAdminCreateConcertForm() {
  const form = useForm<AdminCreateConcertFormValues>({
    defaultValues: {
      name: "",
      description: "",
      totalSeats: 500
    },
    mode: "onSubmit"
  });

  const setServerError = (message: string) => {
    form.setError("root.serverError", {
      type: "server",
      message
    });
  };

  const clearServerError = () => {
    form.clearErrors("root.serverError");
  };

  return {
    ...form,
    setServerError,
    clearServerError
  };
}
