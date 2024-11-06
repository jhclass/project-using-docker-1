import { Module } from "@nestjs/common";
import { DeleteConsultationMemoResolver } from "./delete-consultation-memo.resolver";
import { DeleteConsultationMemoService } from "./delete-consultation-memo.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteConsultationMemoResolver, DeleteConsultationMemoService],
})
export class DeleteConsultationMemoModule {}
