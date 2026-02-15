import { Global, Module } from "@nestjs/common";
import { InMemoryDbService } from "./storage.service";

@Global()
@Module({
  providers: [InMemoryDbService],
  exports: [InMemoryDbService]
})
export class StorageModule {}
