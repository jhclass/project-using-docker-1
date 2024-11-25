import { Module } from "@nestjs/common";
import { EditLecturesResolver } from "./edit-lectures.resolver";
import { EditLecturesService } from "./edit-lectures.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditLecturesResolver, EditLecturesService],
})
export class EditLecturesModule {}
