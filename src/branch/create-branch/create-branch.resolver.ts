import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateBranchService } from "@src/branch/create-branch/create-branch.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateBranchResolver {
  constructor(private createbranchService: CreateBranchService) {}
  @Mutation(() => CommonResponse)
  async createBranch(
    @Args("branchName") branchName: string,
  ): Promise<CommonResponse> {
    return this.createbranchService.createBranchServiceFunc(branchName);
  }
}
