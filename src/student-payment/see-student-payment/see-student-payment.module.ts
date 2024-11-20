import { Module } from "@nestjs/common";
import { SeeStudentPaymentResolver } from "./see-student-payment.resolver";
import { SeeStudentPaymentService } from "./see-student-payment.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeStudentPaymentResolver, SeeStudentPaymentService],
})
export class SeeStudentPaymentModule {}
