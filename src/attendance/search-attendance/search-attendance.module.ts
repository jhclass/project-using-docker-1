import { Module } from "@nestjs/common";
import { SearchAttendanceResolver } from "./search-attendance.resolver";
import { SearchAttendanceService } from "./search-attendance.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchAttendanceResolver, SearchAttendanceService],
})
export class SearchAttendanceModule {}
