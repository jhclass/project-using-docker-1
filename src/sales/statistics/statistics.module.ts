import { Module } from "@nestjs/common";
import { StatisticsResolver } from "./statistics.resolver";
import { StatisticsService } from "./statistics.service";
import { PrismaModule } from "@src/prisma/prisma.module";
@Module({
  imports: [PrismaModule],
  providers: [StatisticsResolver, StatisticsService],
})
export class StatisticsModule {}
