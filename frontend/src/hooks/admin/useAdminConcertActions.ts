"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateConcertInput, createConcert, deleteConcert } from "@/api/admin";
import { queryKeys } from "@/lib/queryKeys";

export function useAdminConcertActions() {
  const queryClient = useQueryClient();

  const createConcertMutation = useMutation({
    mutationFn: (payload: CreateConcertInput) => createConcert(payload)
  });

  const deleteConcertMutation = useMutation({
    mutationFn: (concertId: string) => deleteConcert(concertId)
  });

  const refreshAdminData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.concerts }),
      queryClient.invalidateQueries({ queryKey: queryKeys.adminSummary })
    ]);
  };

  return {
    createConcertMutation,
    deleteConcertMutation,
    refreshAdminData
  };
}
