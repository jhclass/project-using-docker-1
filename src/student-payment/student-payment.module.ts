import { Module } from "@nestjs/common";
import { CreateStudentPaymentModule } from "./create-student-payment/create-student-payment.module";

@Module({
  imports: [CreateStudentPaymentModule],
})
export class StudentPaymentModule {}
