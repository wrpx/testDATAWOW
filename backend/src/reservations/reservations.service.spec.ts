import { Test, TestingModule } from "@nestjs/testing";
import { ConcertsService } from "../concerts/concerts.service";
import { InMemoryDbService } from "../storage/storage.service";
import { ReservationsService } from "./reservations.service";

describe("ReservationsService", () => {
  let reservationsService: ReservationsService;
  let concertsService: ConcertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryDbService, ConcertsService, ReservationsService]
    }).compile();

    reservationsService = module.get<ReservationsService>(ReservationsService);
    concertsService = module.get<ConcertsService>(ConcertsService);
  });

  it("reserves a seat successfully", () => {
    const concert = concertsService.findAll()[0];

    const result = reservationsService.reserveSeat("user-1", {
      concertId: concert.id,
      username: "Sara John"
    });

    expect(result.success).toBe(true);
    expect(reservationsService.getReservedCount()).toBe(1);
  });

  it("prevents same user from reserving another seat", () => {
    const [concertA, concertB] = concertsService.findAll();

    reservationsService.reserveSeat("user-1", {
      concertId: concertA.id,
      username: "Sara John"
    });

    expect(() =>
      reservationsService.reserveSeat("user-1", {
        concertId: concertB.id,
        username: "Sara John"
      })
    ).toThrow("1 user can reserve only 1 seat at a time");
  });

  it("cancels reserved seat", () => {
    const concert = concertsService.findAll()[0];

    reservationsService.reserveSeat("user-1", {
      concertId: concert.id,
      username: "Sara John"
    });

    const result = reservationsService.cancelSeat("user-1", concert.id);

    expect(result.success).toBe(true);
    expect(reservationsService.getReservedCount()).toBe(0);
    expect(reservationsService.getUserHistory("user-1").length).toBe(2);
  });
});
