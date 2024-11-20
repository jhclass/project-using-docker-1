import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { SearchStudentPaymentService } from "./search-student-payment.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SearchStudentPaymentResult } from "@src/result-dto/common-response.dto";

@Resolver()
export class SearchStudentPaymentResolver {
  constructor(
    private readonly searchStudentPaymentService: SearchStudentPaymentService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => SearchStudentPaymentResult)
  async searchStudentPayment(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true })
    id?: number,
    @Args("page", { type: () => Int, nullable: true })
    page?: number,
    @Args("limit", { type: () => Int, nullable: true })
    limit?: number,
    @Args("studentName", { nullable: true })
    studentName?: string,
    @Args("period", { type: () => [String], nullable: true })
    period?: string[],
    @Args("createdPeriod", { type: () => [String], nullable: true })
    createdPeriod?: string[],
    @Args("subDiv", { nullable: true })
    subDiv?: string,
    @Args("employment", { nullable: true })
    employment?: string, // 취업여부
    @Args("lectureAssignment", { nullable: true })
    lectureAssignment?: string, // 배정미배정
  ): Promise<SearchStudentPaymentResult> {
    return this.searchStudentPaymentService.searchStudentPaymentFunc(
      context,
      id,
      page,
      limit,
      studentName,
      period,
      createdPeriod,
      subDiv,
      employment,
      lectureAssignment,
    );
  }
}
