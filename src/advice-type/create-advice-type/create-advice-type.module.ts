import { Module } from "@nestjs/common";
import { CreateAdviceTypeService } from "./create-advice-type.service";
import { CreateAdviceTypeResolver } from "./create-advice-type.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateAdviceTypeService, CreateAdviceTypeResolver],
})
export class CreateAdviceTypeModule {}
