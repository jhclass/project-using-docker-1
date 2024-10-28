import { Module } from "@nestjs/common";
import { DeleteAdviceTypeService } from "./delete-advice-type.service";
import { DeleteAdviceTypeResolver } from "./delete-advice-type.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteAdviceTypeService, DeleteAdviceTypeResolver],
})
export class DeleteAdviceTypeModule {}
