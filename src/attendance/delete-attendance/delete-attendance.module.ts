import { Module } from "@nestjs/common";
import { DeleteAttendanceResolver } from "./delete-attendance.resolver";
import { DeleteAttendanceService } from "./delete-attendance.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteAttendanceResolver, DeleteAttendanceService],
})
export class DeleteAttendanceModule {}
