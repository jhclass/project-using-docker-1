import { Module } from "@nestjs/common";
import { SearchAttendanceRecordResolver } from "./search-attendance-record.resolver";
import { SearchAttendanceRecordService } from "./search-attendance-record.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchAttendanceRecordResolver, SearchAttendanceRecordService],
})
export class SearchAttendanceRecordModule {}
