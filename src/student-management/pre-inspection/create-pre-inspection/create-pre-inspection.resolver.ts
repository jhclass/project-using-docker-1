import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { CreatePreInspectionService } from "./create-pre-inspection.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class CreatePreInspectionResolver {
  constructor(
    private readonly createPreInspectionService: CreatePreInspectionService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createPreInspection(
    @Context() context: any,
    @Args("subjectId", { type: () => Int })
    subjectId: number,
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number,
    @Args("dateOfPreInspection", { nullable: true })
    dateOfPreInspection?: string, //#사전점검일
    @Args("preScreenerType", { nullable: true })
    preScreenerType?: string, //# 사전검사구분 "강사","교무팀"
    @Args("preInspectionDetails", { nullable: true })
    preInspectionDetails?: string, //# 사전점검내용
    @Args("actionTaken", { nullable: true })
    actionTaken?: string, //#조치사항
  ): Promise<CommonResponse> {
    return this.createPreInspectionService.createPreInspectionFunc(
      context,
      subjectId,
      studentPaymentId,
      dateOfPreInspection,
      preScreenerType,
      preInspectionDetails,
      actionTaken,
    );
  }
}
