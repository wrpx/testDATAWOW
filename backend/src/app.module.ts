import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import { ConcertsModule } from "./concerts/concerts.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [StorageModule, ConcertsModule, ReservationsModule, AdminModule]
})
export class AppModule {}
