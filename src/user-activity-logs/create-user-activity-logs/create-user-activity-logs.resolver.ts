import { Args, Resolver, Mutation, Context } from "@nestjs/graphql";
import { CreateUserActivityLogsService } from "./create-user-activity-logs.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateUserActivityLogsResolver {
  constructor(
    private readonly createUserActivityLogsService: CreateUserActivityLogsService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createUserActivityLogs(
    @Context() context: any,
    @Args("eventName") eventName: string,
    @Args("description", { nullable: true }) description?: string,
  ): Promise<CommonResponse> {
    return this.createUserActivityLogsService.createUserActivityLogsFunc(
      context,
      eventName,
      description,
    );
  }
}
