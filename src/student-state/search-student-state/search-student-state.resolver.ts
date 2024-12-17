import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SearchStudentStateResult } from "@src/student-state/entity/studentState.entity";
import { UseGuards } from "@nestjs/common";
import { SearchStudentStateService } from "./search-student-state.service";
@Resolver()
export class SearchStudentStateResolver {
  constructor(private searchStudentStateService: SearchStudentStateService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => SearchStudentStateResult)
  async searchStudentState(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true }) id?: number,
    @Args("receiptDiv", { nullable: true }) receiptDiv?: string,
    @Args("phoneNum1", { nullable: true }) phoneNum1?: string,
    @Args("subDiv", { nullable: true }) subDiv?: string,
    @Args("pic", { nullable: true }) pic?: string,
    @Args("createdAt", { type: () => [String], nullable: "itemsAndList" })
    createdAt?: string[],
    @Args("stVisit", { type: () => [String], nullable: "itemsAndList" })
    stVisit?: string[],
    @Args("stName", { nullable: true }) stName?: string,
    @Args("adviceType", { nullable: true }) adviceType?: string,
    @Args("progress", { type: () => [Int], nullable: "itemsAndList" })
    progress?: number[],
    @Args("page", { type: () => Int, nullable: true }) page?: number,
    @Args("perPage", { type: () => Int, nullable: true }) perPage?: number,
  ): Promise<SearchStudentStateResult> {
    return this.searchStudentStateService.searchcStudentStateFunc(
      context,
      id,
      receiptDiv,
      phoneNum1,
      subDiv,
      pic,
      createdAt,
      stVisit,
      stName,
      adviceType,
      progress,
      page,
      perPage,
    );
  }
}
