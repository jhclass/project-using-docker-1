import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateBranchService } from "@src/branch/create-branch/create-branch.service";
import { CommonResponse } from "@src/result-dto/common-response.dto";

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
