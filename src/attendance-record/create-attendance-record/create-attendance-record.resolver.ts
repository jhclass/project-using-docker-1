import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { CreateAttendanceRecordService } from "./create-attendance-record.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class CreateAttendanceRecordResolver {
  constructor(
    private readonly createAttendanceRecordService: CreateAttendanceRecordService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createAttendanceRecord(
    @Context() context: any,
    @Args("clockIn") clockIn: string,
  ): Promise<CommonResponse> {
    return this.createAttendanceRecordService.createAttendanceFunc(
      context,
      clockIn,
    );
  }
}
