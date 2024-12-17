import { Args, Query, Resolver, Int, Context } from "@nestjs/graphql";
import { SeePaymentDetailService } from "./see-payment-detail.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { PaymentDetailResult } from "@src/payment-detail/entity/paymentDetail.entity";

@Resolver()
export class SeePaymentDetailResolver {
  constructor(
    private readonly seePaymentDetailService: SeePaymentDetailService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => PaymentDetailResult)
  async seePaymentDetail(
    @Context() context: any,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
  ): Promise<PaymentDetailResult> {
    return this.seePaymentDetailService.seePaymentDetailFunc(
      context,
      page,
      limit,
    );
  }
}
