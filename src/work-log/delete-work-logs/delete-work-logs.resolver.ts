import { Resolver, Mutation, Args, Int } from "@nestjs/graphql";
import { DeleteWorkLogsService } from "./delete-work-logs.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class DeleteWorkLogsResolver {
  constructor(private readonly deleteWorkLogsService: DeleteWorkLogsService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteWorkLogs(
    @Args("id", { type: () => Int })
    id: number,
  ) {
    return this.deleteWorkLogsService.deleteWorkLogsFunc(id);
  }
}
