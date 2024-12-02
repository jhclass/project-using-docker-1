import { Module } from "@nestjs/common";
import { EditWorkLogsResolver } from "./edit-work-logs.resolver";
import { EditWorkLogsService } from "./edit-work-logs.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditWorkLogsResolver, EditWorkLogsService],
})
export class EditWorkLogsModule {}
