import {
  ConflictException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { ConcertsService } from "../concerts/concerts.service";
import { ReserveSeatDto } from "./dto/reserve-seat.dto";
import { ReservationAction } from "./models/reservation.model";
import { InMemoryDbService } from "../storage/storage.service";

@Injectable()
export class ReservationsService {
  constructor(
    private readonly db: InMemoryDbService,
    private readonly concertsService: ConcertsService
  ) {}

  reserveSeat(userId: string, dto: ReserveSeatDto) {
    const concert = this.concertsService.findById(dto.concertId);
    const username = dto.username.trim();

    const existingReservation = this.db.activeReservations.find(
      (reservation) => reservation.userId === userId
    );

    if (existingReservation && existingReservation.concertId === dto.concertId) {
      throw new ConflictException("You already reserved this concert");
    }

    if (existingReservation && existingReservation.concertId !== dto.concertId) {
      throw new ConflictException("1 user can reserve only 1 seat at a time");
    }

    if (concert.reservedSeats >= concert.totalSeats) {
      throw new ConflictException("No seats available");
    }

    this.db.activeReservations.push({
      userId,
      username,
      concertId: dto.concertId,
      reservedAt: new Date().toISOString()
    });

    concert.reservedSeats += 1;
    concert.updatedAt = new Date().toISOString();

    this.db.addHistory({
      userId,
      username,
      concertId: concert.id,
      concertName: concert.name,
      action: ReservationAction.RESERVE
    });

    return {
      success: true,
      message: "Reserved successfully"
    };
  }

  cancelSeat(userId: string, concertId: string) {
    const index = this.db.activeReservations.findIndex(
      (reservation) =>
        reservation.userId === userId && reservation.concertId === concertId
    );

    if (index === -1) {
      throw new NotFoundException("Reservation not found");
    }

    const reservation = this.db.activeReservations[index];
    this.db.activeReservations.splice(index, 1);

    const concert = this.db.concerts.find((item) => item.id === concertId);
    if (concert) {
      concert.reservedSeats = Math.max(0, concert.reservedSeats - 1);
      concert.updatedAt = new Date().toISOString();
    }

    this.db.addHistory({
      userId,
      username: reservation.username,
      concertId,
      concertName: concert?.name ?? "Unknown concert",
      action: ReservationAction.CANCEL
    });

    return {
      success: true,
      message: "Canceled successfully"
    };
  }

  getUserHistory(userId: string) {
    return this.db.history.filter((item) => item.userId === userId);
  }

  getAllHistory() {
    return this.db.history;
  }

  getReservedCount(): number {
    return this.db.activeReservations.length;
  }

  getCancelCount(): number {
    return this.db.history.filter((item) => item.action === ReservationAction.CANCEL)
      .length;
  }
}
