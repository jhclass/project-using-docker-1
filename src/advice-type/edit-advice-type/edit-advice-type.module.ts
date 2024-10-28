import { Module } from "@nestjs/common";
import { EditAdviceTypeResolver } from "./edit-advice-type.resolver";
import { EditAdviceTypeService } from "./edit-advice-type.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditAdviceTypeResolver, EditAdviceTypeService],
})
export class EditAdviceTypeModule {}
