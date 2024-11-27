import { Args, Context, Int, Query, Resolver } from "@nestjs/graphql";
import { SeeAttendanceService } from "./see-attendance.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SeeAttendanceResult } from "@src/result-dto/common-response.dto";

@Resolver()
export class SeeAttendanceResolver {
  constructor(private readonly seeAttendanceService: SeeAttendanceService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => SeeAttendanceResult)
  async seeAttendance(
    @Context() context: any,
    @Args("attendanceDate") attendanceDate: string,
    @Args("lecturesId", { type: () => Int }) lecturesId: number,
  ) {
    return this.seeAttendanceService.seeAttendanceFunc(
      context,
      attendanceDate,
      lecturesId,
    );
  }
}
