import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { BatchService } from "./batch.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot()],
  providers: [BatchService],
})
export class BatchModule {}
