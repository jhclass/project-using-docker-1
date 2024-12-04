import { Module } from "@nestjs/common";
import { CreateEduInfomationModule } from "./create-edu-infomation/create-edu-infomation.module";
import { EditEduInfomationModule } from "./edit-edu-infomation/edit-edu-infomation.module";
import { DeleteEduInfomationModule } from "./delete-edu-infomation/delete-edu-infomation.module";

@Module({
  imports: [
    CreateEduInfomationModule,
    EditEduInfomationModule,
    DeleteEduInfomationModule,
  ],
})
export class EduInfomationModule {}
