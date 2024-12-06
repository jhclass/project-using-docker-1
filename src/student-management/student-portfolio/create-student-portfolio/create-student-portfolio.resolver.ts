import { Resolver, Mutation, Args, Context, Int } from "@nestjs/graphql";
import { CreateStudentPortfolioService } from "./create-student-portfolio.service";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/result-dto/common-response.dto";
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
    @Args("filePath", { type: () => [String] })
    filePath: string[],
    @Args("studentPaymentId")
    studentPaymentId: number,
    @Args("subjectId", { type: () => Int })
    subjectId: number,
    @Args("isBest", { nullable: true })
    isBest?: string, //우수학생체크 필수아님

    @Args("details", { nullable: true })
    details?: string,
    @Args("url", { type: () => [String], nullable: "itemsAndList" })
    url?: string[],
  ): Promise<CommonResponse> {
    return this.createStudentPortfolioService.createStudentPortfolioFunc(
      context,
      filePath,
      studentPaymentId,
      subjectId,
      isBest,
      details,
      url,
    );
  }
}
