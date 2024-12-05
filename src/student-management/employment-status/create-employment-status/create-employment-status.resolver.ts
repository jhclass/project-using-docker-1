import { Args, Context, Resolver, Mutation, Int } from "@nestjs/graphql";
import { CreateEmploymentStatusService } from "./create-employment-status.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class CreateEmploymentStatusResolver {
  constructor(
    private readonly createEmploymentStatusService: CreateEmploymentStatusService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createEmploymentStatus(
    @Context() context: any,
    @Args("employmentType")
    employmentType: string, // 구분 : 취업,창업
    @Args("dateOfEmployment")
    dateOfEmployment: string, //취업일자
    @Args("companyName")
    companyName: string, // 회사이름
    @Args("businessNum")
    businessNum: string, // 사업자번호
    @Args("responsibilities")
    responsibilities: string, //# 담당업무
    @Args("location")
    location: string, // 소재지
    @Args("phoneNum")
    phoneNum: string, // 전화번호
    @Args("businessSize")
    businessSize: string, // 사업장규모
    @Args("imploymentInsurance")
    imploymentInsurance: string, // 고용보험여부 : Y || N
    @Args("proofOfImployment")
    proofOfImployment: string, // 재직증명 : Y || N
    @Args("relatedFields")
    relatedFields: string, // 관련분야 : 동일/관련/다른
    @Args("completionType")
    completionType: string, // 수료타입 : 조기,수료
    @Args("subjectId", { type: () => Int })
    subjectId: number,
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number,
  ): Promise<CommonResponse> {
    return this.createEmploymentStatusService.createEmplopymentStatusFunc(
      context,
      employmentType,
      dateOfEmployment,
      companyName,
      businessNum,
      responsibilities,
      location,
      phoneNum,
      businessSize,
      imploymentInsurance,
      proofOfImployment,
      relatedFields,
      completionType,
      subjectId,
      studentPaymentId,
    );
  }
}
