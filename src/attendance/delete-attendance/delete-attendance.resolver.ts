import { Resolver, Mutation, Args, Int } from "@nestjs/graphql";
import { DeleteAttendanceService } from "./delete-attendance.service";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/result-dto/common-response.dto";
@Resolver()
export class DeleteAttendanceResolver {
  constructor(
    private readonly deleteAttendanceService: DeleteAttendanceService,
  ) {}
  @UseGuards()
  @Mutation(() => CommonResponse)
  async deleteAttendance(@Args("id", { type: () => Int }) id: number) {
    return this.deleteAttendanceService.deleteAttendanceFunc(id);
  }
}
