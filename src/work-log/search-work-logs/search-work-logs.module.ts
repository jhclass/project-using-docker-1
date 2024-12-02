import { Module } from "@nestjs/common";
import { SearchWorkLogsService } from "./search-work-logs.service";
import { SearchWorkLogsResolver } from "./search-work-logs.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchWorkLogsService, SearchWorkLogsResolver],
})
export class SearchWorkLogsModule {}
