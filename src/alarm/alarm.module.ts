import { Module } from "@nestjs/common";
import { ReadAlarmsModule } from "./read-alarms/read-alarms.module";
import { SeeAlarmsModule } from "./see-alarms/see-alarms.module";

@Module({
  imports: [ReadAlarmsModule, SeeAlarmsModule],
})
export class AlarmModule {}
