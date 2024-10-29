import { Module } from "@nestjs/common";
import { ReadAlarmsModule } from "./read-alarms/read-alarms.module";

@Module({
  imports: [ReadAlarmsModule],
})
export class AlarmModule {}
