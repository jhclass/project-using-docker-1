import { Args, Int, Mutation, Resolver, Context } from "@nestjs/graphql";
import { CreateSubjectService } from "./create-subject.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/common-entity/common-response.entity";
@Resolver()
export class CreateSubjectResolver {
  constructor(private readonly createSubjectService: CreateSubjectService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createSubject(
    @Context() context: any,
    @Args("subDiv") subDiv: string,
    @Args("subjectName") subjectName: string,
    @Args("fee", { type: () => Int }) fee: number,
    @Args("round", { type: () => Int }) round: number,
    @Args("startDate", { nullable: true }) startDate?: string,
    @Args("endDate", { nullable: true }) endDate?: string,
    @Args("roomNum", { nullable: true }) roomNum?: string,
    @Args("exposure", { nullable: true }) exposure?: boolean,
    @Args("totalTime", { type: () => Int, nullable: true }) totalTime?: number,
    @Args("teacherName", { nullable: true }) teacherName?: string,
    @Args("subjectCode", { nullable: true }) subjectCode?: string,
    @Args("expiresDateStart", { nullable: true }) expiresDateStart?: string,
    @Args("expiresDateEnd", { nullable: true }) expiresDateEnd?: string,
  ): Promise<CommonResponse> {
    return this.createSubjectService.createSubjectFunc(
      context,
      subDiv,
      subjectName,
      fee,
      round,
      startDate,
      endDate,
      roomNum,
      exposure,
      totalTime,
      teacherName,
      subjectCode,
      expiresDateStart,
      expiresDateEnd,
    );
  }
}
