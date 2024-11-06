import { Module } from "@nestjs/common";
import { CreateConsultationMemoModule } from "./create-consultation-memo/create-consultation-memo.module";
import { EditConsultationMemoModule } from "./edit-consultation-memo/edit-consultation-memo.module";
import { DeleteConsultationMemoModule } from "./delete-consultation-memo/delete-consultation-memo.module";

@Module({
  imports: [
    CreateConsultationMemoModule,
    EditConsultationMemoModule,
    DeleteConsultationMemoModule,
  ],
})
export class ConsultationMemoModule {}
