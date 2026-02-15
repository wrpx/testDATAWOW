import { apiRequest } from "@/api/httpClient";
import { AdminSummary, ApiReservationHistory, ApiSuccessResponse, Concert } from "@/lib/types";

export type CreateConcertInput = {
  name: string;
  description: string;
  totalSeats: number;
};

export function fetchAdminSummary() {
  return apiRequest<AdminSummary>({ path: "/admin/summary" });
}

export function createConcert(payload: CreateConcertInput) {
  return apiRequest<Concert>({
    path: "/admin/concerts",
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function deleteConcert(concertId: string) {
  return apiRequest<ApiSuccessResponse>({
    path: `/admin/concerts/${concertId}`,
    method: "DELETE"
  });
}

export function fetchAdminReservationHistory() {
  return apiRequest<ApiReservationHistory[]>({
    path: "/admin/reservations/history"
  });
}
