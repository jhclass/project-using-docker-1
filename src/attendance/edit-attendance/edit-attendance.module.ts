import { Module } from "@nestjs/common";
import { EditAttendanceResolver } from "./edit-attendance.resolver";
import { EditAttendanceService } from "./edit-attendance.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditAttendanceResolver, EditAttendanceService],
})
export class EditAttendanceModule {}
