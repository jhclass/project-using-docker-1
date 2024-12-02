import { Module } from "@nestjs/common";
import { CreateWorkLogsModule } from "./create-work-logs/create-work-logs.module";
import { EditWorkLogsModule } from "./edit-work-logs/edit-work-logs.module";
import { DeleteWorkLogsModule } from "./delete-work-logs/delete-work-logs.module";
import { SearchWorkLogsModule } from "./search-work-logs/search-work-logs.module";

@Module({
  imports: [
    CreateWorkLogsModule,
    EditWorkLogsModule,
    DeleteWorkLogsModule,
    SearchWorkLogsModule,
  ],
})
export class WorklogsModule {}
