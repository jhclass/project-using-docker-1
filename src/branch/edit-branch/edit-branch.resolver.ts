import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { EditBranchService } from "./edit-branch.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class EditBranchResolver {
  constructor(private editBranchService: EditBranchService) {}
  @Mutation(() => CommonResponse)
  async editBranch(
    @Args("id", { type: () => Int }) id: number,
    @Args("newBranchName") newBranchName: string,
  ): Promise<CommonResponse> {
    return this.editBranchService.editBranchServiceFunc(id, newBranchName);
  }
}
