import { Module } from "@nestjs/common";
import { CreateAttendanceRecordResolver } from "./create-attendance-record.resolver";
import { CreateAttendanceRecordService } from "./create-attendance-record.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateAttendanceRecordResolver, CreateAttendanceRecordService],
})
export class CreateAttendanceRecordModule {}
