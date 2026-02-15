import { apiRequest } from "@/api/httpClient";
import { ApiReservationHistory, ApiSuccessResponse } from "@/lib/types";

type ReserveSeatInput = {
  concertId: string;
  username: string;
};

export function fetchUserReservationHistory(userId: string) {
  return apiRequest<ApiReservationHistory[]>({
    path: `/users/${userId}/reservations/history`
  });
}

export function reserveSeat(userId: string, payload: ReserveSeatInput) {
  return apiRequest<ApiSuccessResponse>({
    path: `/users/${userId}/reservations`,
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function cancelSeatReservation(userId: string, concertId: string) {
  return apiRequest<ApiSuccessResponse>({
    path: `/users/${userId}/reservations/${concertId}`,
    method: "DELETE"
  });
}
