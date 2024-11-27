import { Module } from "@nestjs/common";
import { CreateAttendanceResolver } from "./create-attendance.resolver";
import { CreateAttendanceService } from "./create-attendance.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateAttendanceResolver, CreateAttendanceService],
})
export class CreateAttandanceModule {}
