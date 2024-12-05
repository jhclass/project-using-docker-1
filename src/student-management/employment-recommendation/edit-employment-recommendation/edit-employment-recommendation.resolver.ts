import { Args, Resolver, Mutation, Int, Context } from "@nestjs/graphql";
import { EditEmploymentRecommendationService } from "./edit-employment-recommendation.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { UseGuards } from "@nestjs/common";
@Resolver()
export class EditEmploymentRecommendationResolver {
  constructor(
    private readonly editEmploymentRecommendationService: EditEmploymentRecommendationService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editEmploymentRecommendation(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("lastModifiedTime")
    lastModifiedTime: string, //최근수정시간
    @Args("dateOfRecommendation", { nullable: true })
    dateOfRecommendation?: string, // 추천일자
    @Args("recruitmentField", { nullable: true })
    recruitmentField?: string, // 채용분야
    @Args("companyName", { nullable: true })
    companyName?: string, // 회사명
    @Args("location", { nullable: true })
    location?: string, // 소재지
    @Args("phoneNum", { nullable: true })
    phoneNum?: string, // 전화번호
    @Args("dateOfInterview", { nullable: true })
    dateOfInterview?: string, // 면접일
    @Args("employmentStatus", { nullable: true })
    employmentStatus?: string, // 취업여부 : Y || N
    @Args("reasonForNonEmployment", { nullable: true })
    reasonForNonEmployment?: string, // 미취업사유
    @Args("certificateOfEmploymentStatus", { nullable: true })
    certificateOfEmploymentStatus?: string, // 재직증명서확보여부 : Y || N
  ): Promise<CommonResponse> {
    return this.editEmploymentRecommendationService.editEmploymentRecommendationFunc(
      context,
      id,
      lastModifiedTime,
      dateOfRecommendation,
      recruitmentField,
      companyName,
      location,
      phoneNum,
      dateOfInterview,
      employmentStatus,
      reasonForNonEmployment,
      certificateOfEmploymentStatus,
    );
  }
}
