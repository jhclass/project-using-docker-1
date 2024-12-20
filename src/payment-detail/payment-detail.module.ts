import { Module } from "@nestjs/common";
import { CreatePaymentDetailModule } from "./create-payment-detail/create-payment-detail.module";
import { EditPaymentDetailModule } from "./edit-payment-detail/edit-payment-detail.module";
import { DeletePaymentDetailModule } from "./delete-payment-detail/delete-payment-detail.module";
import { SeePaymentDetailModule } from "./see-payment-detail/see-payment-detail.module";
import { SearchPaymentDetailModule } from "./search-payment-detail/search-payment-detail.module";
import { SalesModule } from "@src/sales/sales.module";
import { RefundModule } from "@src/refund/refund.module";

@Module({
  imports: [
    CreatePaymentDetailModule,
    EditPaymentDetailModule,
    DeletePaymentDetailModule,
    SeePaymentDetailModule,
    SearchPaymentDetailModule,
    SalesModule,
    RefundModule,
  ],
})
export class PaymentDetailModule {}
