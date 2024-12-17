import { Args, Mutation, Resolver, Int, Context } from "@nestjs/graphql";
import { SearchSubjectService } from "./search-subject.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SearchSubjectResult } from "@src/subject/entity/subject.entity";

@Resolver()
export class SearchSubjectResolver {
  constructor(private readonly searchSubjectService: SearchSubjectService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => SearchSubjectResult)
  async searchSubject(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true }) id?: number,
    @Args("subDiv", { nullable: true }) subDiv?: string,
    @Args("subjectName", { nullable: true }) subjectName?: string,
    @Args("subjectCode", { nullable: true }) subjectCode?: string,
    @Args("exposure", { nullable: true }) exposure?: boolean,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
  ): Promise<SearchSubjectResult> {
    return this.searchSubjectService.searchSubjectFunc(
      context,
      id,
      subDiv,
      subjectName,
      subjectCode,
      exposure,
      page,
      limit,
    );
  }
}
