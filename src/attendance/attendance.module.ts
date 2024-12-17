import { Module } from "@nestjs/common";
import { CreateAttandanceModule } from "./create-attendance/create-attendance.module";
import { EditAttendanceModule } from "./edit-attendance/edit-attendance.module";
import { DeleteAttendanceModule } from "./delete-attendance/delete-attendance.module";
import { SeeAttendanceModule } from "./see-attendance/see-attendance.module";
import { SearchAttendanceModule } from "./search-attendance/search-attendance.module";

@Module({
  imports: [
    CreateAttandanceModule,
    EditAttendanceModule,
    DeleteAttendanceModule,
    SeeAttendanceModule,
    SearchAttendanceModule,
  ],
})
export class AttendanceModule {}
