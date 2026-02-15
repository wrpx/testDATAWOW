"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { cancelSeatReservation, reserveSeat } from "@/api/user";
import { ToastTone } from "@/hooks/useTimedToast";
import { APP_USER_ID, APP_USERNAME } from "@/lib/config";
import { queryKeys } from "@/lib/queryKeys";
import { Concert } from "@/lib/types";

type ShowToastFn = (message: string, tone?: ToastTone) => void;

type ToggleReserveInput = {
  concertId: string;
  isReservedByUser: boolean;
};

export function useUserReservationActions(showToast: ShowToastFn) {
  const queryClient = useQueryClient();
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const toggleReserveMutation = useMutation({
    mutationFn: ({ concertId, isReservedByUser }: ToggleReserveInput) => {
      if (isReservedByUser) {
        return cancelSeatReservation(APP_USER_ID, concertId);
      }

      return reserveSeat(APP_USER_ID, {
        concertId,
        username: APP_USERNAME
      });
    }
  });

  const toggleReserve = async (concertId: string, concerts: Concert[]) => {
    const target = concerts.find((item) => item.id === concertId);
    if (!target) return;

    try {
      setActionLoadingId(concertId);
      const result = await toggleReserveMutation.mutateAsync({
        concertId,
        isReservedByUser: Boolean(target.isReservedByUser)
      });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.concerts }),
        queryClient.invalidateQueries({ queryKey: queryKeys.userHistory(APP_USER_ID) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.adminSummary }),
        queryClient.invalidateQueries({ queryKey: queryKeys.adminHistory })
      ]);

      showToast(result.message, "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Request failed";
      showToast(message, "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  return {
    actionLoadingId,
    toggleReserve
  };
}
