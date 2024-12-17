import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { CreateStudentConsultationService } from "./create-student-consultation.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateStudentConsultationResolver {
  constructor(
    private readonly createStudentConsultationService: CreateStudentConsultationService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createStudentConsultation(
    @Context() context: any,
    @Args("typeOfConsultation")
    typeOfConsultation: string,
    @Args("dateOfConsultation") // 상담유형 : 기초상담,취업상담, 사후관리
    dateOfConsultation: string,
    @Args("detailsOfConsultation") // 상담일자
    detailsOfConsultation: string,
    @Args("subjectId", { type: () => Int }) // 상담내용
    subjectId: number,
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number,
  ): Promise<CommonResponse> {
    return this.createStudentConsultationService.createStudentConsultationFunc(
      context,
      typeOfConsultation,
      dateOfConsultation,
      detailsOfConsultation,
      subjectId,
      studentPaymentId,
    );
  }
}
