import { Args, Context, Int, Query, Resolver } from "@nestjs/graphql";
import { SearchWorkLogsService } from "./search-work-logs.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SearchWorkLogsResult } from "@src/result-dto/common-response.dto";

@Resolver()
export class SearchWorkLogsResolver {
  constructor(private readonly searchWorkLogsService: SearchWorkLogsService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => SearchWorkLogsResult)
  async searchWorkLogs(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true })
    id?: number,
    @Args("workLogsDate", { nullable: true })
    workLogsDate?: string,
    @Args("lecturesId", { type: () => Int, nullable: true })
    lecturesId?: number,
  ): Promise<SearchWorkLogsResult> {
    return this.searchWorkLogsService.searchWorkLogsFunc(
      context,
      id,
      workLogsDate,
      lecturesId,
    );
  }
}
