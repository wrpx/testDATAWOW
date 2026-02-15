"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminSummary } from "@/api/admin";
import { fetchConcerts } from "@/api/concerts";
import { queryKeys } from "@/lib/queryKeys";
import { AdminSummary } from "@/lib/types";

const initialSummary: AdminSummary = {
  totalSeats: 0,
  reserveCount: 0,
  cancelCount: 0
};

export function useAdminDashboardData() {
  const concertsQuery = useQuery({
    queryKey: queryKeys.concerts,
    queryFn: fetchConcerts,
    staleTime: 10_000
  });

  const summaryQuery = useQuery({
    queryKey: queryKeys.adminSummary,
    queryFn: fetchAdminSummary,
    staleTime: 10_000
  });

  const isLoading = concertsQuery.isLoading || summaryQuery.isLoading;
  const pageError = concertsQuery.error ?? summaryQuery.error;

  return {
    concerts: concertsQuery.data ?? [],
    summary: summaryQuery.data ?? initialSummary,
    isLoading,
    pageErrorMessage: pageError instanceof Error ? pageError.message : null
  };
}
