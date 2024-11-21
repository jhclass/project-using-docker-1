import { Module } from "@nestjs/common";
import { SearchPaymentDetailResolver } from "./search-payment-detail.resolver";
import { SearchPaymentDetailService } from "./search-payment-detail.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchPaymentDetailResolver, SearchPaymentDetailService],
})
export class SearchPaymentDetailModule {}
