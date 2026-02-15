import { Injectable } from "@nestjs/common";
import { CreateConcertDto } from "../concerts/dto/create-concert.dto";
import { ConcertsService } from "../concerts/concerts.service";
import { ReservationsService } from "../reservations/reservations.service";

@Injectable()
export class AdminService {
  constructor(
    private readonly concertsService: ConcertsService,
    private readonly reservationsService: ReservationsService
  ) {}

  createConcert(dto: CreateConcertDto) {
    return this.concertsService.create(dto);
  }

  deleteConcert(concertId: string) {
    this.concertsService.remove(concertId);
    return {
      success: true,
      message: "Deleted successfully"
    };
  }

  getReservationHistory() {
    return this.reservationsService.getAllHistory();
  }

  getSummary() {
    return {
      totalSeats: this.concertsService.getTotalSeats(),
      reserveCount: this.reservationsService.getReservedCount(),
      cancelCount: this.reservationsService.getCancelCount()
    };
  }
}
