import { Injectable } from "@nestjs/common";
import { Concert } from "../concerts/models/concert.model";
import {
  ReservationAction,
  ReservationHistory,
  UserReservation
} from "../reservations/models/reservation.model";

@Injectable()
export class InMemoryDbService {
  concerts: Concert[] = [];
  activeReservations: UserReservation[] = [];
  history: ReservationHistory[] = [];

  private concertSequence = 0;
  private historySequence = 0;

  constructor() {
    this.seedConcerts();
  }

  nextConcertId(): string {
    this.concertSequence += 1;
    return `concert-${this.concertSequence}`;
  }

  nextHistoryId(): string {
    this.historySequence += 1;
    return `history-${this.historySequence}`;
  }

  addHistory(input: {
    userId: string;
    username: string;
    concertId: string;
    concertName: string;
    action: ReservationAction;
  }) {
    this.history.unshift({
      id: this.nextHistoryId(),
      ...input,
      timestamp: new Date().toISOString()
    });
  }

  private seedConcerts() {
    const now = new Date().toISOString();
    this.concerts = [
      {
        id: this.nextConcertId(),
        name: "The Festival Int 2024",
        description:
          "Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a.",
        totalSeats: 500,
        reservedSeats: 120,
        createdAt: now,
        updatedAt: now
      },
      {
        id: this.nextConcertId(),
        name: "Acoustic Night 2024",
        description:
          "Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in.",
        totalSeats: 200,
        reservedSeats: 12,
        createdAt: now,
        updatedAt: now
      }
    ];
  }
}
