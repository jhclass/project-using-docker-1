import { Module } from "@nestjs/common";
import { EditPaymentDetailResolver } from "./edit-payment-detail.resolver";
import { EditPaymentDetailService } from "./edit-payment-detail.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditPaymentDetailResolver, EditPaymentDetailService],
})
export class EditPaymentDetailModule {}
