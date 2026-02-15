export interface Concert {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  reservedSeats: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConcertView extends Concert {
  remainingSeats: number;
  soldOut: boolean;
}
