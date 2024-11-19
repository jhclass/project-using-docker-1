import { Args, Mutation, Resolver, Int, Context } from "@nestjs/graphql";
import { SearchStudentService } from "./search-student.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SearchStudentResult } from "@src/result-dto/common-response.dto";

@Resolver()
export class SearchStudentResolver {
  constructor(private readonly searchStudentService: SearchStudentService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => SearchStudentResult)
  async searchStudent(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true })
    id?: number,
    @Args("studentName", { nullable: true })
    studentName?: string,
    @Args("createdAt", { type: () => [String], nullable: "itemsAndList" })
    createdAt?: string[],
    @Args("birthday", { type: () => [String], nullable: "itemsAndList" })
    birthday?: string[],
    @Args("phoneNum", { nullable: true })
    phoneNum?: string,
    @Args("page", { type: () => Int, nullable: true })
    page?: number,
    @Args("limit", { type: () => Int, nullable: true })
    limit?: number,
  ): Promise<SearchStudentResult> {
    return this.searchStudentService.searchStudentFunc(
      context,
      id,
      studentName,
      createdAt,
      birthday,
      phoneNum,
      page,
      limit,
    );
  }
}
