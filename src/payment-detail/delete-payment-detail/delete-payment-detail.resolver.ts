import { Args, Int, Resolver, Mutation } from "@nestjs/graphql";
import { DeletePaymentDetailService } from "./delete-payment-detail.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/result-dto/common-response.dto";
@Resolver()
export class DeletePaymentDetailResolver {
  constructor(
    private readonly deletePaymentDetailService: DeletePaymentDetailService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deletePaymentDetail(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deletePaymentDetailService.deletePaymentDetailFunc(id);
  }
}
