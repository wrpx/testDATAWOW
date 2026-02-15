import { Injectable, NotFoundException } from "@nestjs/common";
import { InMemoryDbService } from "../storage/storage.service";
import { CreateConcertDto } from "./dto/create-concert.dto";
import { Concert, ConcertView } from "./models/concert.model";

@Injectable()
export class ConcertsService {
  constructor(private readonly db: InMemoryDbService) {}

  findAll(): ConcertView[] {
    return this.db.concerts.map((concert) => this.toConcertView(concert));
  }

  findById(id: string): Concert {
    const concert = this.db.concerts.find((item) => item.id === id);
    if (!concert) {
      throw new NotFoundException("Concert not found");
    }
    return concert;
  }

  create(dto: CreateConcertDto): ConcertView {
    const now = new Date().toISOString();
    const concert: Concert = {
      id: this.db.nextConcertId(),
      name: dto.name.trim(),
      description: dto.description.trim(),
      totalSeats: dto.totalSeats,
      reservedSeats: 0,
      createdAt: now,
      updatedAt: now
    };

    this.db.concerts.unshift(concert);
    return this.toConcertView(concert);
  }

  remove(id: string): void {
    const index = this.db.concerts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException("Concert not found");
    }

    this.db.concerts.splice(index, 1);
    this.db.activeReservations = this.db.activeReservations.filter(
      (reservation) => reservation.concertId !== id
    );
  }

  toConcertView(concert: Concert): ConcertView {
    const remainingSeats = Math.max(0, concert.totalSeats - concert.reservedSeats);
    return {
      ...concert,
      remainingSeats,
      soldOut: remainingSeats === 0
    };
  }

  getTotalSeats(): number {
    return this.db.concerts.reduce((total, concert) => total + concert.totalSeats, 0);
  }
}
