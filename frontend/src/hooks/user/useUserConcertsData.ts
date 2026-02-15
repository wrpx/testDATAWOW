"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchConcerts } from "@/api/concerts";
import { fetchUserReservationHistory } from "@/api/user";
import { APP_USER_ID } from "@/lib/config";
import { queryKeys } from "@/lib/queryKeys";
import { ReservationHistory } from "@/lib/types";

function formatDateTime(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  const date = parsed.toLocaleDateString("en-GB");
  const time = parsed.toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return `${date} ${time}`;
}

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

  const { concerts, userHistory } = useMemo(() => {
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

    const normalizedConcerts = concertPayload.map((concert) => ({
      ...concert,
      isReservedByUser: latestActionByConcert.get(concert.id) === "Reserve"
    }));

    const normalizedHistory: ReservationHistory[] = sortedHistory.map((item) => ({
      id: item.id,
      dateTime: formatDateTime(item.timestamp),
      username: item.username,
      concertName: item.concertName,
      action: item.action
    }));

    return {
      concerts: normalizedConcerts,
      userHistory: normalizedHistory
    };
  }, [concertsQuery.data, historyQuery.data]);

  const isLoading = concertsQuery.isLoading || historyQuery.isLoading;
  const queryError = concertsQuery.error ?? historyQuery.error;

  return {
    concerts,
    userHistory,
    isLoading,
    errorMessage: queryError instanceof Error ? queryError.message : null
  };
}
