import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ReserveSeatDto } from "./dto/reserve-seat.dto";
import { ReservationsService } from "./reservations.service";

@Controller("users/:userId/reservations")
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  reserveSeat(@Param("userId") userId: string, @Body() dto: ReserveSeatDto) {
    return this.reservationsService.reserveSeat(userId, dto);
  }

  @Delete(":concertId")
  cancelSeat(
    @Param("userId") userId: string,
    @Param("concertId") concertId: string
  ) {
    return this.reservationsService.cancelSeat(userId, concertId);
  }

  @Get("history")
  getHistory(@Param("userId") userId: string) {
    return this.reservationsService.getUserHistory(userId);
  }
}
