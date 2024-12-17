import { Context, Mutation, Resolver, Args, Int } from "@nestjs/graphql";
import { CreateRegularEvaluationSetService } from "./create-regular-evaluation-set.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateRegularEvaluationSetResolver {
  constructor(
    private readonly createRegularEvaluationSetService: CreateRegularEvaluationSetService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createRegularEvaluationSet(
    @Context() context: any,
    @Args("statusType")
    statusType: string, //# 구분
    @Args("evaluationDetails")
    evaluationDetails: string, //# 평가내용
    @Args("points", { type: () => Int })
    points: number, //# 점수 (배점)
    @Args("subjectId", { type: () => Int })
    subjectId: number,
  ) {
    return this.createRegularEvaluationSetService.createRegularEvaluationSetFunc(
      context,
      statusType,
      evaluationDetails,
      points,
      subjectId,
    );
  }
}
