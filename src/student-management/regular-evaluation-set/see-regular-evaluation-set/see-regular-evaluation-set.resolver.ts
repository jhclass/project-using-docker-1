import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { SeeRegularEvaluationSetService } from "./see-regular-evaluation-set.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { ResultSeeRegularEvaluationSet } from "@src/student-management/regular-evaluation-set/entity/regularEvaluationSet.entity";

@Resolver()
export class SeeRegularEvaluationSetResolver {
  constructor(
    private readonly seeRegularEvaluationSetService: SeeRegularEvaluationSetService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultSeeRegularEvaluationSet)
  async seeRegularEvaluationSet(
    @Args("lectureId", { type: () => Int, nullable: true })
    lectureId?: number,
    @Args("subjectId", { type: () => Int, nullable: true })
    subjectId?: number,
    @Args("page", { type: () => Int, nullable: true })
    page?: number,
    @Args("limit", { type: () => Int, nullable: true })
    limit?: number,
  ): Promise<ResultSeeRegularEvaluationSet> {
    return this.seeRegularEvaluationSetService.seeRegularEvaluationSetFunc(
      lectureId,
      subjectId,
      page,
      limit,
    );
  }
}
