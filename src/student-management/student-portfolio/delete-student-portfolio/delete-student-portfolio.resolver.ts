import { Resolver, Mutation, Args, Int } from "@nestjs/graphql";
import { DeleteStudentPortfolioService } from "./delete-student-portfolio.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class DeleteStudentPortfolioResolver {
  constructor(
    private readonly deleteStudentPortfolioService: DeleteStudentPortfolioService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteFileNameSp(
    @Args("id", { type: () => Int }) id: number,
    @Args("fileUrl")
    fileUrl?: string,
    @Args("folderName")
    folderName?: string,
  ): Promise<CommonResponse> {
    return this.deleteStudentPortfolioService.deleteStudentPortfolioFunc(
      id,
      fileUrl,
      folderName,
    );
  }
}
