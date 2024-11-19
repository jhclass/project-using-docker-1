import { Module } from "@nestjs/common";
import { CreateStudentPaymentResolver } from "./create-student-payment.resolver";
import { CreateStudentPaymentService } from "./create-student-payment.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateStudentPaymentResolver, CreateStudentPaymentService],
})
export class CreateStudentPaymentModule {}
