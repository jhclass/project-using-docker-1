import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { EditAttendanceService } from "./edit-attendance.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class EditAttendanceResolver {
  constructor(private readonly editAttendanceService: EditAttendanceService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editAttendance(
    @Args("lastModifiedTime")
    lastModifiedTime: string, //최근수정시간
    @Args("id", { type: () => [Int], nullable: "items" })
    id?: number[],
    @Args("attendanceState", { type: () => [String], nullable: "items" })
    attendanceState?: string[],
  ) {
    return this.editAttendanceService.editAttendanceFunc(
      lastModifiedTime,
      id,
      attendanceState,
    );
  }
}
