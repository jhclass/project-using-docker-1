import { Module } from "@nestjs/common";
import { CreateStudentPaymentModule } from "./create-student-payment/create-student-payment.module";
import { EditStudentPaymentModule } from "./edit-student-payment/edit-student-payment.module";
import { DeleteStudentPaymentModule } from "./delete-student-payment/delete-student-payment.module";
import { SeeStudentPaymentModule } from "./see-student-payment/see-student-payment.module";
import { SearchStudentPaymentModule } from "./search-student-payment/search-student-payment.module";

@Module({
  imports: [
    CreateStudentPaymentModule,
    EditStudentPaymentModule,
    DeleteStudentPaymentModule,
    SeeStudentPaymentModule,
    SearchStudentPaymentModule,
  ],
})
export class StudentPaymentModule {}
