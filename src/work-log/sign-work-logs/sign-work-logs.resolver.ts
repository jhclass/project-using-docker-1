import { Args, Context, Int, Query, Resolver } from "@nestjs/graphql";
import { SignWorkLogsService } from "./sign-work-logs.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SignWorkLogsResult } from "@src/result-dto/common-response.dto";

@Resolver()
export class SignWorkLogsResolver {
  constructor(private readonly signWorkLogsService: SignWorkLogsService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => SignWorkLogsResult)
  async signWorkLogs(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("lastModifiedTime", { nullable: true })
    lastModifiedTime?: string,
  ): Promise<SignWorkLogsResult> {
    return this.signWorkLogsService.signWorkLogsFunc(
      context,
      id,
      lastModifiedTime,
    );
  }
}
