import { Args, Int, Mutation, Resolver, Context } from "@nestjs/graphql";
import { UpdateStudentStateResult } from "@src/result-dto/common-response.dto";
import { EditStudentStateService } from "./edit-student-state.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class EditStudentStateResolver {
  constructor(
    private readonly editStudentStateService: EditStudentStateService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => UpdateStudentStateResult)
  async updateStudentState(
    @Context() context: any,
    @Args("id", { type: () => Int }) id: number,
    @Args("campus", { nullable: true }) campus?: string,
    @Args("category", { nullable: true }) category?: string,
    @Args("stName", { nullable: true }) stName?: string,
    @Args("phoneNum1", { nullable: true }) phoneNum1?: string,
    @Args("phoneNum2", { nullable: true }) phoneNum2?: string,
    @Args("phoneNum3", { nullable: true }) phoneNum3?: string,
    @Args("subject", { type: () => [String], nullable: "itemsAndList" })
    subject?: string[],
    @Args("detail", { nullable: true }) detail?: string,
    @Args("progress", { type: () => Int, nullable: true }) progress?: number,
    @Args("stEmail", { nullable: true }) stEmail?: string,
    @Args("stAddr", { nullable: true }) stAddr?: string,
    @Args("subDiv", { nullable: true }) subDiv?: string,
    @Args("stVisit", { nullable: true }) stVisit?: string,
    @Args("expEnrollDate", { nullable: true }) expEnrollDate?: string,
    @Args("perchase", { nullable: true }) perchase?: boolean,
    @Args("birthday", { nullable: true }) birthday?: string,
    @Args("pic", { nullable: true }) pic?: string,
    @Args("receiptDiv", { nullable: true }) receiptDiv?: string,
    @Args("adviceTypes", { type: () => [Int], nullable: "itemsAndList" })
    adviceTypes?: number[],
    @Args("lastModifiedTime", { nullable: true }) lastModifiedTime?: string,
  ): Promise<UpdateStudentStateResult> {
    return this.editStudentStateService.editStudentStateFunc(
      context,
      id,
      campus,
      category,
      stName,
      phoneNum1,
      phoneNum2,
      phoneNum3,
      subject,
      detail,
      progress,
      stEmail,
      stAddr,
      subDiv,
      stVisit,
      expEnrollDate,
      perchase,
      birthday,
      pic,
      receiptDiv,
      adviceTypes,
      lastModifiedTime,
    );
  }
}
