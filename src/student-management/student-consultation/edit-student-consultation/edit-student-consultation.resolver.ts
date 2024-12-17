import { Args, Context, Mutation, Resolver, Int } from "@nestjs/graphql";
import { EditStudentConsultationService } from "./edit-student-consultation.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class EditStudentConsultationResolver {
  constructor(
    private readonly editStudentConsultationService: EditStudentConsultationService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editStudentConsultation(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("lastModifiedTime")
    lastModifiedTime: string, //최근수정시간
    @Args("typeOfConsultation", { nullable: true })
    typeOfConsultation: string, // 상담유형 : 기초상담,취업상담, 사후관리
    @Args("dateOfConsultation", { nullable: true })
    dateOfConsultation: string, // 상담일자
    @Args("detailsOfConsultation", { nullable: true })
    detailsOfConsultation: string, // 상담내용
  ): Promise<CommonResponse> {
    return this.editStudentConsultationService.editStudentConsultationFunc(
      context,
      id,
      lastModifiedTime,
      typeOfConsultation,
      dateOfConsultation,
      detailsOfConsultation,
    );
  }
}
