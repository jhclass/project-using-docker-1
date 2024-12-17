import { Context, Query, Resolver } from "@nestjs/graphql";
import { SeeUserActivityLogsService } from "./see-user-activity-logs.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UserActivityLogsResponse } from "@src/user-activity-logs/entity/user-activity-logs.entity";

@Resolver()
export class SeeUserActivityLogsResolver {
  constructor(
    private readonly seeUserActivityLogsService: SeeUserActivityLogsService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => UserActivityLogsResponse)
  async seeUserActivityLogs(@Context() context: any) {
    return this.seeUserActivityLogsService.seeUserActivityLogsFunc(context);
  }
}
