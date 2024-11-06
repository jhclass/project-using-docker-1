import { Module } from '@nestjs/common';
import { CreateConsultationMemoModule } from './create-consultation-memo/create-consultation-memo.module';

@Module({
  imports: [CreateConsultationMemoModule]
})
export class ConsultationMemoModule {}
