import { Args, Mutation, Resolver, Int, Context } from "@nestjs/graphql";
import { SearchLecturesService } from "./search-lectures.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SearchLecturesResult } from "@src/result-dto/common-response.dto";

@Resolver()
export class SearchLecturesResolver {
  constructor(private readonly searchLecturesService: SearchLecturesService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => SearchLecturesResult)
  async searchLectures(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true })
    id?: number,
    @Args("periodStart", { nullable: true })
    periodStart?: string, //시작일기준으로 검색
    @Args("periodEnd", { nullable: true })
    periodEnd?: string, // 종료일기준으로 검색
    @Args("temporaryName", { nullable: true })
    temporaryName?: string, // 표시과목명
    @Args("subjectId", { type: () => Int, nullable: true })
    subjectId?: number, // 과정id
    @Args("teacherId", { type: () => Int, nullable: true })
    teacherId?: number, // 강사 id
    @Args("limit", { type: () => Int, nullable: true })
    limit?: number,
    @Args("page", { type: () => Int, nullable: true })
    page?: number,
  ): Promise<SearchLecturesResult> {
    return this.searchLecturesService.searchLecturesFunc(
      context,
      id,
      periodStart,
      periodEnd,
      temporaryName,
      subjectId,
      teacherId,
      limit,
      page,
    );
  }
}
