import { Module } from "@nestjs/common";
import { EditPreInspectionResolver } from "./edit-pre-inspection.resolver";
import { EditPreInspectionService } from "./edit-pre-inspection.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditPreInspectionResolver, EditPreInspectionService],
})
export class EditPreInspectionModule {}
