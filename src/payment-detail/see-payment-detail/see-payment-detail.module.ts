import { Module } from "@nestjs/common";
import { SeePaymentDetailResolver } from "./see-payment-detail.resolver";
import { SeePaymentDetailService } from "./see-payment-detail.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeePaymentDetailResolver, SeePaymentDetailService],
})
export class SeePaymentDetailModule {}
