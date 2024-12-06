import { Mutation, Resolver, Args, Int } from "@nestjs/graphql";
import { EditStudentPortfolioService } from "./edit-student-portfolio.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class EditStudentPortfolioResolver {
  constructor(
    private readonly editStudentPortfolioService: EditStudentPortfolioService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editStudentPortfolio(
    @Args("id", { type: () => Int })
    id: number,
    @Args("lastModifiedTime")
    lastModifiedTime: string, //최근수정시간
    @Args("isBest", { nullable: true })
    isBest?: string,
    @Args("filePath", { type: () => [String], nullable: "itemsAndList" })
    filePath?: string[],
    @Args("details", { nullable: true })
    details?: string,
    @Args("url", { type: () => [String], nullable: "itemsAndList" })
    url?: string[],
  ): Promise<CommonResponse> {
    return this.editStudentPortfolioService.editStudentPortfolioFunc(
      id,
      lastModifiedTime,
      isBest,
      filePath,
      details,
      url,
    );
  }
}
