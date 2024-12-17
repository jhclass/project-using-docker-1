import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { EditRegularEvaluationSetService } from "./edit-regular-evaluation-set.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class EditRegularEvaluationSetResolver {
  constructor(
    private readonly editRegularEvaluationSetService: EditRegularEvaluationSetService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editRegularEvaluationSet(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("statusType")
    statusType: string, // 구분
    @Args("evaluationDetails")
    evaluationDetails: string, // 평가내용
    @Args("points", { type: () => Int })
    points: number, // 점수 (배점)
    @Args("lastModifiedTime")
    lastModifiedTime: string, //최근수정시간
  ) {
    return this.editRegularEvaluationSetService.editRegularEvaluationSetFunc(
      context,
      id,
      statusType,
      evaluationDetails,
      points,
      lastModifiedTime,
    );
  }
}
