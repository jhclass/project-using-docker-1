import { Module } from "@nestjs/common";
import { CreatePreInspectionResolver } from "./create-pre-inspection.resolver";
import { CreatePreInspectionService } from "./create-pre-inspection.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreatePreInspectionResolver, CreatePreInspectionService],
})
export class CreatePreInspectionModule {}
