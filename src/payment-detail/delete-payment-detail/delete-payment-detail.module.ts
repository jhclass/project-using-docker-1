import { Module } from "@nestjs/common";
import { DeletePaymentDetailResolver } from "./delete-payment-detail.resolver";
import { DeletePaymentDetailService } from "./delete-payment-detail.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeletePaymentDetailResolver, DeletePaymentDetailService],
})
export class DeletePaymentDetailModule {}
