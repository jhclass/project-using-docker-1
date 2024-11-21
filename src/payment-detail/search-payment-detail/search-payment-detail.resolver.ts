import { Args, Resolver, Int, Context, Mutation } from "@nestjs/graphql";
import { SearchPaymentDetailService } from "./search-payment-detail.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { PaymentDetailResult } from "@src/result-dto/common-response.dto";
@Resolver()
export class SearchPaymentDetailResolver {
  constructor(
    private readonly searchPaymentDetailService: SearchPaymentDetailService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => PaymentDetailResult)
  async searchPaymentDetail(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true })
    id?: number,
    @Args("period", { type: () => [String], nullable: "itemsAndList" })
    period?: string[],
    @Args("stName", { nullable: true })
    stName?: string,
    @Args("page", { type: () => Int, nullable: true })
    page?: number,
    @Args("limit", { type: () => Int, nullable: true })
    limit?: number,
    @Args("reqRefund", { nullable: true })
    reqRefund?: boolean,
    @Args("refundApproval", { nullable: true })
    refundApproval?: boolean,
    @Args("reqRefundDate", { type: () => [String], nullable: "itemsAndList" })
    reqRefundDate?: string[],
    @Args("receiverId", { type: () => Int, nullable: true })
    receiverId?: number,
    @Args("refundApprovalDate", {
      type: () => [String],
      nullable: "itemsAndList",
    })
    refundApprovalDate?: string[],
    @Args("ApprovalNum", { nullable: true })
    ApprovalNum?: string, //승인번호
    @Args("sortOf", { nullable: true })
    sortOf?: string,
    @Args("paymentDate", { type: () => [String], nullable: "itemsAndList" })
    paymentDate?: string[],
  ): Promise<PaymentDetailResult> {
    return this.searchPaymentDetailService.searchPaymentDetailFunc(
      context,
      id,
      period,
      stName,
      page,
      limit,
      reqRefund,
      refundApproval,
      reqRefundDate,
      receiverId,
      refundApprovalDate,
      ApprovalNum,
      sortOf,
      paymentDate,
    );
  }
}
