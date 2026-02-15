import { Module } from "@nestjs/common";
import { ConcertsModule } from "../concerts/concerts.module";
import { ReservationsModule } from "../reservations/reservations.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
  imports: [ConcertsModule, ReservationsModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
