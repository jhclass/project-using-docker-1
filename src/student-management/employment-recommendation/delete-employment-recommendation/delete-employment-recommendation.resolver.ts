import { Int, Mutation, Resolver, Args } from "@nestjs/graphql";
import { DeleteEmploymentRecommendationService } from "./delete-employment-recommendation.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class DeleteEmploymentRecommendationResolver {
  constructor(
    private readonly deleteEmploymentRecommendationService: DeleteEmploymentRecommendationService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteRecommendation(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteEmploymentRecommendationService.deleteEmploymentRecommendationFunc(
      id,
    );
  }
}
