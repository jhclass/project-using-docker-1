import { Module } from "@nestjs/common";
import { EditStudentPaymentResolver } from "./edit-student-payment.resolver";
import { EditStudentPaymentService } from "./edit-student-payment.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditStudentPaymentResolver, EditStudentPaymentService],
})
export class EditStudentPaymentModule {}
