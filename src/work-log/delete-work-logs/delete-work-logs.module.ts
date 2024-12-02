import { Module } from "@nestjs/common";
import { DeleteWorkLogsResolver } from "./delete-work-logs.resolver";
import { DeleteWorkLogsService } from "./delete-work-logs.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteWorkLogsResolver, DeleteWorkLogsService],
})
export class DeleteWorkLogsModule {}
