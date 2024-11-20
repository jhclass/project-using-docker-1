import { Int, Mutation, Resolver, Args } from "@nestjs/graphql";
import { DeleteStudentPaymentService } from "./delete-student-payment.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class DeleteStudentPaymentResolver {
  constructor(
    private readonly deleteStudentPaymentService: DeleteStudentPaymentService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteStudentPayment(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteStudentPaymentService.deleteStudentPaymentFunc(id);
  }
}
