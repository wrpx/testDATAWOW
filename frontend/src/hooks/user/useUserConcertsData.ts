"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchConcerts } from "@/api/concerts";
import { fetchUserReservationHistory } from "@/api/user";
import { APP_USER_ID } from "@/lib/config";
import { queryKeys } from "@/lib/queryKeys";

export function useUserConcertsData() {
  const concertsQuery = useQuery({
    queryKey: queryKeys.concerts,
    queryFn: fetchConcerts,
    staleTime: 10_000
  });

  const historyQuery = useQuery({
    queryKey: queryKeys.userHistory(APP_USER_ID),
    queryFn: () => fetchUserReservationHistory(APP_USER_ID),
    staleTime: 10_000
  });

  const concerts = useMemo(() => {
    const concertPayload = concertsQuery.data ?? [];
    const historyPayload = historyQuery.data ?? [];

    const latestActionByConcert = new Map<string, "Reserve" | "Cancel">();
    const sortedHistory = [...historyPayload].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    for (const item of sortedHistory) {
      if (!latestActionByConcert.has(item.concertId)) {
        latestActionByConcert.set(item.concertId, item.action);
      }
    }

    return concertPayload.map((concert) => ({
      ...concert,
      isReservedByUser: latestActionByConcert.get(concert.id) === "Reserve"
    }));
  }, [concertsQuery.data, historyQuery.data]);

  const isLoading = concertsQuery.isLoading || historyQuery.isLoading;
  const queryError = concertsQuery.error ?? historyQuery.error;

  return {
    concerts,
    isLoading,
    errorMessage: queryError instanceof Error ? queryError.message : null
  };
}
