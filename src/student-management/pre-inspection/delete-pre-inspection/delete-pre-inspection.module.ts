import { Module } from "@nestjs/common";
import { DeletePreInspectionResolver } from "./delete-pre-inspection.resolver";
import { DeletePreInspectionService } from "./delete-pre-inspection.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeletePreInspectionResolver, DeletePreInspectionService],
})
export class DeletePreInspectionModule {}
