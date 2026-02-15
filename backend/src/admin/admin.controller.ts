import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateConcertDto } from "../concerts/dto/create-concert.dto";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("summary")
  getSummary() {
    return this.adminService.getSummary();
  }

  @Post("concerts")
  createConcert(@Body() dto: CreateConcertDto) {
    return this.adminService.createConcert(dto);
  }

  @Delete("concerts/:concertId")
  deleteConcert(@Param("concertId") concertId: string) {
    return this.adminService.deleteConcert(concertId);
  }

  @Get("reservations/history")
  getReservationHistory() {
    return this.adminService.getReservationHistory();
  }
}
