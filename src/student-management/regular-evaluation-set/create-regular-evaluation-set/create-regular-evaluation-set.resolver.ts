import { Context, Mutation, Resolver, Args } from "@nestjs/graphql";
import { CreateRegularEvaluationSetService } from "./create-regular-evaluation-set.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

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
    @Args("points")
    points: number, //# 점수 (배점)
    @Args("subjectId")
    subjectId: number,
  ) {
    return this.createRegularEvaluationSetService.createRegularEvaluationSetFunc(
      Context,
      statusType,
      evaluationDetails,
      points,
      subjectId,
    );
  }
}
