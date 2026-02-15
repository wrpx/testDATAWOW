export enum ReservationAction {
  RESERVE = "Reserve",
  CANCEL = "Cancel"
}

export interface UserReservation {
  userId: string;
  username: string;
  concertId: string;
  reservedAt: string;
}

export interface ReservationHistory {
  id: string;
  userId: string;
  username: string;
  concertId: string;
  concertName: string;
  action: ReservationAction;
  timestamp: string;
}
