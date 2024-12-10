import { Module } from "@nestjs/common";
import { DeleteMessageStorageResolver } from "./delete-message-storage.resolver";
import { DeleteMessageStorageService } from "./delete-message-storage.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteMessageStorageResolver, DeleteMessageStorageService],
})
export class DeleteMessageStorageModule {}
