import { Args, Context, Int, Query, Resolver } from "@nestjs/graphql";
import { SearchAttendanceRecordService } from "./search-attendance-record.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { ResultSearchAttendanceRecord } from "../entity/attendanceRecord.entity";

@Resolver()
export class SearchAttendanceRecordResolver {
  constructor(
    private readonly searchAttendanceRecordService: SearchAttendanceRecordService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultSearchAttendanceRecord)
  async searchAttendanceRecord(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true }) id?: number,
    @Args("period", { type: () => [String], nullable: "itemsAndList" })
    period?: string[],
    @Args("mUserId", { nullable: true }) mUserId?: string,
    @Args("mUsername", { nullable: true }) mUserName?: string,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
  ): Promise<ResultSearchAttendanceRecord> {
    return this.searchAttendanceRecordService.searchAttendanceRecordFunc(
      context,
      id,
      period,
      mUserId,
      mUserName,
      page,
      limit,
    );
  }
}
