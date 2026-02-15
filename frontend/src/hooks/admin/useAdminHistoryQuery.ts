"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminReservationHistory } from "@/api/admin";
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

export function useAdminHistoryQuery() {
  const historyQuery = useQuery({
    queryKey: queryKeys.adminHistory,
    queryFn: fetchAdminReservationHistory,
    staleTime: 10_000,
    select: (payload): ReservationHistory[] =>
      payload.map((item) => ({
        id: item.id,
        dateTime: formatDateTime(item.timestamp),
        username: item.username,
        concertName: item.concertName,
        action: item.action
      }))
  });

  return {
    history: historyQuery.data ?? [],
    isLoading: historyQuery.isLoading,
    errorMessage: historyQuery.error instanceof Error ? historyQuery.error.message : null
  };
}
