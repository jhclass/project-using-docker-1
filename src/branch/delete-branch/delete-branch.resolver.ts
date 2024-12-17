import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeleteBranchService } from "./delete-branch.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DeleteBranchResolver {
  constructor(private deleteBranchService: DeleteBranchService) {}
  @Mutation(() => CommonResponse)
  async deleteBranch(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteBranchService.deleteBranchFunc(id);
  }
}
