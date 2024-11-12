import { Module } from "@nestjs/common";
import { CreateUserActivityLogsModule } from "./create-user-activity-logs/create-user-activity-logs.module";
import { SeeUserActivityLogsModule } from "./see-user-activity-logs/see-user-activity-logs.module";

@Module({
  imports: [CreateUserActivityLogsModule, SeeUserActivityLogsModule],
})
export class UserActivityLogsModule {}
