import { Resolver, Mutation, Args, Context, Int } from "@nestjs/graphql";
import { CreateStudentPortfolioService } from "./create-student-portfolio.service";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class CreateStudentPortfolioResolver {
  constructor(
    private readonly createStudentPortfolioService: CreateStudentPortfolioService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createStudentPortfolio(
    @Context() context: any,
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number,
    @Args("subjectId", { type: () => Int })
    subjectId: number,
    @Args("filePath", { type: () => [String], nullable: "items" })
    filePath?: string[],
    @Args("isBest", { nullable: true })
    isBest?: string, //우수학생체크 필수아님

    @Args("details", { nullable: true })
    details?: string,
    @Args("url", { type: () => [String], nullable: "itemsAndList" })
    url?: string[],
  ): Promise<CommonResponse> {
    return this.createStudentPortfolioService.createStudentPortfolioFunc(
      context,
      studentPaymentId,
      subjectId,
      filePath,
      isBest,
      details,
      url,
    );
  }
}
