"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { ConcertCard } from "@/components/common/concert-card";
import { Toast } from "@/components/common/toast";
import { apiRequest } from "@/lib/api-client";
import { APP_USER_ID, APP_USERNAME } from "@/lib/config";
import { queryKeys } from "@/lib/query-keys";
import { ApiReservationHistory, ApiSuccessResponse, Concert } from "@/lib/types";

type ToastState = {
  message: string;
  tone: "success" | "error";
};

type ToggleReserveInput = {
  concertId: string;
  isReservedByUser: boolean;
};

export function UserHome() {
  const queryClient = useQueryClient();

  const [toast, setToast] = useState<ToastState | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (message: string, tone: ToastState["tone"] = "success") => {
    setToast({ message, tone });

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 2200);
  };

  const concertsQuery = useQuery({
    queryKey: queryKeys.concerts,
    queryFn: () => apiRequest<Concert[]>({ path: "/concerts" }),
    staleTime: 10_000
  });

  const historyQuery = useQuery({
    queryKey: queryKeys.userHistory(APP_USER_ID),
    queryFn: () =>
      apiRequest<ApiReservationHistory[]>({
        path: `/users/${APP_USER_ID}/reservations/history`
      }),
    staleTime: 10_000
  });

  const toggleReserveMutation = useMutation({
    mutationFn: ({ concertId, isReservedByUser }: ToggleReserveInput) => {
      if (isReservedByUser) {
        return apiRequest<ApiSuccessResponse>({
          path: `/users/${APP_USER_ID}/reservations/${concertId}`,
          method: "DELETE"
        });
      }

      return apiRequest<ApiSuccessResponse>({
        path: `/users/${APP_USER_ID}/reservations`,
        method: "POST",
        body: JSON.stringify({
          concertId,
          username: APP_USERNAME
        })
      });
    }
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
  const errorMessage = queryError instanceof Error ? queryError.message : null;

  useEffect(() => {
    if (errorMessage) {
      showToast(errorMessage, "error");
    }
  }, [errorMessage]);

  useEffect(
    () => () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    },
    []
  );

  const toggleReserve = async (concertId: string) => {
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

  return (
    <section className="relative space-y-6">
      {toast && <Toast message={toast.message} tone={toast.tone} />}

      {isLoading && <p className="text-lg text-app-text">Loading concerts...</p>}
      {!isLoading && errorMessage && <p className="text-lg text-app-danger">{errorMessage}</p>}

      {!isLoading &&
        !errorMessage &&
        concerts.map((concert) => (
          <ConcertCard
            key={concert.id}
            concert={concert}
            actionLabel={
              actionLoadingId === concert.id
                ? "Processing..."
                : concert.isReservedByUser
                  ? "Cancel"
                  : "Reserve"
            }
            actionTone={concert.isReservedByUser ? "danger" : "primary"}
            actionDisabled={actionLoadingId === concert.id}
            onAction={toggleReserve}
          />
        ))}

      {!isLoading && !errorMessage && concerts.length === 0 && (
        <p className="text-lg text-app-text">No concerts available</p>
      )}
    </section>
  );
}
