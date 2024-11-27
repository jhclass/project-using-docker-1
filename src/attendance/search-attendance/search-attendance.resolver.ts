import { Args, Context, Query, Resolver, Int } from "@nestjs/graphql";
import { SearchAttendanceService } from "./search-attendance.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SearchAttendanceResult } from "@src/result-dto/common-response.dto";

@Resolver()
export class SearchAttendanceResolver {
  constructor(
    private readonly searchAttendanceService: SearchAttendanceService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => SearchAttendanceResult)
  async searchAttendanceResult(
    @Context() context: any,
    @Args("lecturesId", { type: () => Int })
    lecturesId: number,
    @Args("id", { type: () => Int, nullable: true })
    id?: number,
    @Args("attendanceDate", { type: () => [String], nullable: "itemsAndList" })
    attendanceDate?: string[], //출석일 기준
    @Args("studentId", { type: () => Int, nullable: true })
    studentId?: number,
    @Args("studentPaymentId", { type: () => Int, nullable: true })
    studentPaymentId?: number,
  ): Promise<SearchAttendanceResult> {
    return this.searchAttendanceService.searchAttendanceFunc(
      context,
      lecturesId,
      id,
      attendanceDate,
      studentId,
      studentPaymentId,
    );
  }
}
