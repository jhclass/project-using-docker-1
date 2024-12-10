import { Module } from "@nestjs/common";
import { CreateMessageStorageResolver } from "./create-message-storage.resolver";
import { CreateMessageStorageService } from "./create-message-storage.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateMessageStorageResolver, CreateMessageStorageService],
})
export class CreateMessageStorageModule {}
