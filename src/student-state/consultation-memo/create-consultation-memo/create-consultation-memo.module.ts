import { Module } from "@nestjs/common";
import { CreateConsultationMemoResolver } from "./create-consultation-memo.resolver";
import { CreateConsultationMemoService } from "./create-consultation-memo.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateConsultationMemoResolver, CreateConsultationMemoService],
})
export class CreateConsultationMemoModule {}
