import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { DeleteEmploymentStatusService } from "./delete-employment-status.service";

@Resolver()
export class DeleteEmploymentStatusResolver {
  constructor(
    private readonly deleteEmploymentStatusService: DeleteEmploymentStatusService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteEmploymentStatus(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteEmploymentStatusService.deleteEmploymentStatusFunc(id);
  }
}
