import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { CreateEmploymentRecommendationService } from "./create-employment-recommendation.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateEmploymentRecommendationResolver {
  constructor(
    private readonly createEmploymentRecommendationService: CreateEmploymentRecommendationService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createEmploymentRecommendation(
    @Context() context: any,
    @Args("dateOfRecommendation")
    dateOfRecommendation: string, //# 추천일자
    @Args("recruitmentField")
    recruitmentField: string, //# 채용분야
    @Args("companyName")
    companyName: string, //# 회사명
    @Args("location")
    location: string, //# 소재지
    @Args("phoneNum")
    phoneNum: string, //# 전화번호
    @Args("employmentStatus")
    employmentStatus: string, //# 취업여부 : Y || N
    @Args("reasonForNonEmployment")
    reasonForNonEmployment: string, //# 미취업사유
    @Args("certificateOfEmploymentStatus")
    certificateOfEmploymentStatus: string, //# 재직증명서확보여부 : Y || N
    @Args("subjectId", { type: () => Int })
    subjectId: number,
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number,
    @Args("dateOfInterview", { nullable: true })
    dateOfInterview?: string, //# 면접일
  ): Promise<CommonResponse> {
    return this.createEmploymentRecommendationService.createEmploymentRecommendationFunc(
      context,
      dateOfRecommendation,
      recruitmentField,
      companyName,
      location,
      phoneNum,
      employmentStatus,
      reasonForNonEmployment,
      certificateOfEmploymentStatus,
      subjectId,
      studentPaymentId,
      dateOfInterview,
    );
  }
}
