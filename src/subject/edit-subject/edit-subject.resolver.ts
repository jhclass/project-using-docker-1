import { Args, Context, Int, Resolver, Mutation } from "@nestjs/graphql";
import { EditSubjectService } from "./edit-subject.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { UseGuards } from "@nestjs/common";
@Resolver()
export class EditSubjectResolver {
  constructor(private readonly editSubjectService: EditSubjectService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async updateSubject(
    @Context() context: any,
    @Args("id", { type: () => Int }) id: number,
    @Args("subDiv") subDiv: string,
    @Args("subjectName") subjectName: string,
    @Args("fee", { type: () => Int }) fee: number,
    @Args("startDate", { nullable: true }) startDate?: string,
    @Args("endDate", { nullable: true }) endDate?: string,
    @Args("roomNum", { nullable: true }) roomNum?: string,
    @Args("exposure", { nullable: true }) exposure?: boolean,
    @Args("totalTime", { type: () => Int, nullable: true }) totalTime?: number,
    @Args("teacherName", { nullable: true }) teacherName?: string,
    @Args("subjectCode", { nullable: true }) subjectCode?: string,
    @Args("expiresDateStart", { nullable: true }) expiresDateStart?: string,
    @Args("expiresDateEnd", { nullable: true }) expiresDateEnd?: string,
    @Args("mGrade", { type: () => Int, nullable: true }) mGrade?: number,
    @Args("round", { type: () => Int, nullable: true }) round?: number,
    @Args("lastModifiedTime", { nullable: true }) lastModifiedTime?: string,
  ) {
    return this.editSubjectService.editSubjectFunc(
      id,
      subDiv,
      subjectName,
      fee,
      startDate,
      endDate,
      roomNum,
      exposure,
      totalTime,
      teacherName,
      subjectCode,
      expiresDateStart,
      expiresDateEnd,
      mGrade,
      round,
      lastModifiedTime,
    );
  }
}
