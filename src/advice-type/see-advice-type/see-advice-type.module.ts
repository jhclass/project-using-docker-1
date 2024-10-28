import { Module } from "@nestjs/common";
import { SeeAdviceTypeService } from "./see-advice-type.service";
import { SeeAdviceTypeResolver } from "./see-advice-type.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeAdviceTypeService, SeeAdviceTypeResolver],
})
export class SeeAdviceTypeModule {}
