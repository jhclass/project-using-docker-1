import { Module } from "@nestjs/common";
import { SeeMessageStorageResolver } from "./see-message-storage.resolver";
import { SeeMessageStorageService } from "./see-message-storage.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeMessageStorageResolver, SeeMessageStorageService],
})
export class SeeMessageStorageModule {}
