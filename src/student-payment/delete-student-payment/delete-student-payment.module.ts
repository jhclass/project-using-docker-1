import { Module } from "@nestjs/common";
import { DeleteStudentPaymentResolver } from "./delete-student-payment.resolver";
import { DeleteStudentPaymentService } from "./delete-student-payment.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteStudentPaymentResolver, DeleteStudentPaymentService],
})
export class DeleteStudentPaymentModule {}
