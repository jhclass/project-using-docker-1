import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { BatchService } from "./batch.service";

@Module({
  imports: [PrismaModule],
  providers: [BatchService],
})
export class BatchModule {}
