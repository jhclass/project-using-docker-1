import { Module } from "@nestjs/common";
import { SeeAlarmsResolver } from "./see-alarms.resolver";
import { SeeAlarmsService } from "./see-alarms.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeAlarmsResolver, SeeAlarmsService],
})
export class SeeAlarmsModule {}
