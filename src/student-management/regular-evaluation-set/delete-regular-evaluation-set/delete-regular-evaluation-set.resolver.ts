import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeleteRegularEvaluationSetService } from "./delete-regular-evaluation-set.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class DeleteRegularEvaluationSetResolver {
  constructor(
    private readonly deleteRegularEvaluationSetService: DeleteRegularEvaluationSetService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteRegularEvaluationSet(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteRegularEvaluationSetService.deleteRegularEvaluationSetFunc(
      id,
    );
  }
}
