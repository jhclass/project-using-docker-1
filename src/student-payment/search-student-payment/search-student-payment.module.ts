import { Module } from "@nestjs/common";
import { SearchStudentPaymentResolver } from "./search-student-payment.resolver";
import { SearchStudentPaymentService } from "./search-student-payment.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchStudentPaymentResolver, SearchStudentPaymentService],
})
export class SearchStudentPaymentModule {}
