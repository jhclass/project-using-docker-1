import { Args, Int, Mutation, Resolver, Context } from "@nestjs/graphql";
import { DeleteConsultationMemoService } from "./delete-consultation-memo.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class DeleteConsultationMemoResolver {
  constructor(
    private readonly deleteConsultationMemoService: DeleteConsultationMemoService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteConsultationMemo(
    @Context() context: any,
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteConsultationMemoService.deleteConsultationMemoFunc(
      context,
      id,
    );
  }
}
