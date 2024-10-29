import { Module } from "@nestjs/common";
import { ReadAlarmsResolver } from "./read-alarms.resolver";
import { ReadAlarmsService } from "./read-alarms.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [ReadAlarmsResolver, ReadAlarmsService],
})
export class ReadAlarmsModule {}
