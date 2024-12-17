import { Args, Mutation, Resolver, Int, Context } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { CreateWorkLogsService } from "./create-work-logs.service";
@Resolver()
export class CreateWorkLogsResolver {
  constructor(private readonly createWorkLogsService: CreateWorkLogsService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createWorkLogs(
    @Context() context: any,
    @Args("lecturesId", { type: () => Int })
    lecturesId: number,
    @Args("workLogsDate")
    workLogsDate: string,
  ) {
    return this.createWorkLogsService.createWorkLogsFunc(
      context,
      lecturesId,
      workLogsDate,
    );
  }
}
