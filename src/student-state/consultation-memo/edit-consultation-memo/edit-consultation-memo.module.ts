import { Module } from "@nestjs/common";
import { EditConsultationMemoService } from "./edit-consultation-memo.service";
import { EditConsultationMemoResolver } from "./edit-consultation-memo.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditConsultationMemoService, EditConsultationMemoResolver],
})
export class EditConsultationMemoModule {}
