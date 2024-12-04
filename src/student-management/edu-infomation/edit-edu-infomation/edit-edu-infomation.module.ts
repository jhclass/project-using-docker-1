import { Module } from "@nestjs/common";
import { EditEduInfomationResolver } from "./edit-edu-infomation.resolver";
import { EditEduInfomationService } from "./edit-edu-infomation.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditEduInfomationResolver, EditEduInfomationService],
})
export class EditEduInfomationModule {}
