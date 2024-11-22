import { Args, Context, Int, Resolver, Mutation } from "@nestjs/graphql";
import { RefundService } from "./refund.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class RefundResolver {
  constructor(private readonly refundService: RefundService) {}
  //환불신청
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async reqRefund(
    @Context() context: any,
    @Args("id", { type: () => Int }) id: number,
    @Args("reqRefund") reqRefund: boolean,
    @Args("reqRefundDate") reqRefundDate: string,
  ): Promise<CommonResponse> {
    return this.refundService.reqRefundFunc(
      context,
      id,
      reqRefund,
      reqRefundDate,
    );
  }

  //환불승인
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async refundApproval(
    @Context() context: any,
    @Args("id", { type: () => Int }) id: number,
    @Args("refundApproval") refundApproval: boolean,
    @Args("refundApprovalDate") refundApprovalDate: string,
    @Args("studentPaymentId", { type: () => Int }) studentPaymentId: number,
  ) {
    return this.refundService.refundApprovalFunc(
      context,
      id,
      refundApproval,
      refundApprovalDate,
      studentPaymentId,
    );
  }
}
