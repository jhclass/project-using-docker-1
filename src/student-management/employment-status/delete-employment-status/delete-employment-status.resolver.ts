import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";
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
