import { Args, Resolver, Mutation, Int, Context } from "@nestjs/graphql";
import { CreateStudentStateService } from "./create-student-state.service";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class CreateStudentStateResolver {
  constructor(
    private readonly createStudentStateService: CreateStudentStateService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createStudentState(
    @Context() context: any,
    @Args("agreement") agreement: string,
    @Args("subject", { type: () => [String] }) subject: string[],
    @Args("progress", { type: () => Int }) progress: number,
    @Args("adviceTypes", { type: () => [Int] }) adviceTypes: number[],
    @Args("stName", { nullable: true })
    stName?: string,
    @Args("phoneNum1", { nullable: true }) phoneNum1?: string,
    @Args("campus", { nullable: true }) campus?: string,
    @Args("detail", { nullable: true }) detail?: string,
    @Args("category", { nullable: true }) category?: string,
    @Args("phoneNum2", { nullable: true }) phoneNum2?: string,
    @Args("phoneNum3", { nullable: true }) phoneNum3?: string,
    @Args("stEmail", { nullable: true }) stEmail?: string,
    @Args("stAddr", { nullable: true }) stAddr?: string,
    @Args("stVisit", { nullable: true }) stVisit?: string,
    @Args("subDiv", { nullable: true }) subDiv?: string,
    @Args("expEnrollDate", { nullable: true })
    expEnrollDate?: string,
    @Args("perchase", { nullable: true }) perchase?: boolean,
    @Args("birthday", { nullable: true }) birthday?: string,
    @Args("receiptDiv", { nullable: true }) receiptDiv?: string,
    @Args("pic", { nullable: true }) pic?: string,
    @Args("classMethod", { type: () => [String], nullable: "itemsAndList" })
    classMethod?: string[],
    @Args("branchId", { type: () => Int, nullable: true }) branchId?: number,

    //@Args("today", { type: () => [String], nullable: "itemsAndList" })
    //today?: string[],
  ): Promise<CommonResponse> {
    //logger.log(`branchId: ${branchId}`);
    return this.createStudentStateService.createStudentStateFunc(
      context,
      agreement,
      subject,
      progress,
      adviceTypes,
      stName,
      phoneNum1,
      campus,
      detail,
      category,
      phoneNum2,
      phoneNum3,
      stEmail,
      stAddr,
      stVisit,
      subDiv,
      expEnrollDate,
      perchase,
      birthday,
      receiptDiv,
      pic,
      classMethod,
      branchId,

      //today,
    );
  }
}
