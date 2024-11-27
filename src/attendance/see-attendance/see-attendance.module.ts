import { Module } from "@nestjs/common";
import { SeeAttendanceResolver } from "./see-attendance.resolver";
import { SeeAttendanceService } from "./see-attendance.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeAttendanceResolver, SeeAttendanceService],
})
export class SeeAttendanceModule {}
