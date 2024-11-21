import { Module } from "@nestjs/common";
import { CreatePaymentDetailResolver } from "./create-payment-detail.resolver";
import { CreatePaymentDetailService } from "./create-payment-detail.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreatePaymentDetailResolver, CreatePaymentDetailService],
})
export class CreatePaymentDetailModule {}
