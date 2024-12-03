import { Args, Query, Resolver, Int, Context } from "@nestjs/graphql";
import { AcademyRecordService } from "./academy-record.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { ResultAcademyRecord } from "@src/result-dto/common-response.dto";

@Resolver()
export class AcademyRecordResolver {
  constructor(private readonly academyRecordService: AcademyRecordService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultAcademyRecord)
  async searchAcademyRecord(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true })
    id?: number,
    @Args("studentName", { nullable: true })
    studentName?: string,
    @Args("phoneNum", { nullable: true })
    phoneNum?: string,
    @Args("lectureName", { nullable: true })
    lectureName?: string,
    @Args("subDiv", { nullable: true })
    subDiv?: string,
    @Args("teacherName", { nullable: true })
    teacherName?: string,
    @Args("limit", { type: () => Int, nullable: true })
    limit?: number,
    @Args("page", { type: () => Int, nullable: true })
    page?: number,
  ): Promise<ResultAcademyRecord> {
    return this.academyRecordService.searchAcademyRecordFunc(
      context,
      id,
      studentName,
      phoneNum,
      lectureName,
      subDiv,
      teacherName,
      limit,
      page,
    );
  }
}
