import { Module } from "@nestjs/common";
import { CreateUserActivityLogsService } from "./create-user-activity-logs.service";
import { CreateUserActivityLogsResolver } from "./create-user-activity-logs.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateUserActivityLogsService, CreateUserActivityLogsResolver],
})
export class CreateUserActivityLogsModule {}
