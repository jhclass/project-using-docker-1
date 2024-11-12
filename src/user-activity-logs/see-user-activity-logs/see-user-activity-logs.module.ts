import { Module } from "@nestjs/common";
import { SeeUserActivityLogsResolver } from "./see-user-activity-logs.resolver";
import { SeeUserActivityLogsService } from "./see-user-activity-logs.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeUserActivityLogsResolver, SeeUserActivityLogsService],
})
export class SeeUserActivityLogsModule {}
