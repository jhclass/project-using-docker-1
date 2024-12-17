import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { CreateAttendanceService } from "./create-attendance.service";

@Resolver()
export class CreateAttendanceResolver {
  constructor(
    private readonly createAttendanceService: CreateAttendanceService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createAttendance(
    @Context() context: any,
    @Args("attendanceDate")
    attendanceDate: string,
    @Args("lecturesId", { type: () => Int })
    lecturesId: number, //강의 테이블 레코드 id
    @Args("studentPaymentId", { type: () => [Int], nullable: "items" })
    studentPaymentId?: number[], //수강신청 테이블 레코드 id
    @Args("studentId", { type: () => [Int], nullable: "items" })
    studentId?: number[], //학생 테이블 레코드 id
    @Args("attendanceState", { type: () => [String], nullable: "items" })
    attendanceState?: string[],
  ): Promise<CommonResponse> {
    return this.createAttendanceService.createAttendanceFunc(
      context,
      attendanceDate,
      lecturesId,
      studentPaymentId,
      studentId,
      attendanceState,
    );
  }
}
