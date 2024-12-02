import { Module } from "@nestjs/common";
import { CreateWorkLogsService } from "./create-work-logs.service";
import { CreateWorkLogsResolver } from "./create-work-logs.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateWorkLogsService, CreateWorkLogsResolver],
})
export class CreateWorkLogsModule {}
