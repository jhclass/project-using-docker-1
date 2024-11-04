import { Module } from "@nestjs/common";
import { CreateAttendanceRecordModule } from "./create-attendance-record/create-attendance-record.module";
import { SearchAttendanceRecordModule } from "./search-attendance-record/search-attendance-record.module";

@Module({
  imports: [CreateAttendanceRecordModule, SearchAttendanceRecordModule],
})
export class AttendanceRecordModule {}
