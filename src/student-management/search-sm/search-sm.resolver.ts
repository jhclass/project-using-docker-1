import { Args, Context, Query, Resolver, Int } from "@nestjs/graphql";
import { SearchSmService } from "./search-sm.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { ResultSearchSM } from "@src/result-dto/common-response.dto";
import { UseGuards } from "@nestjs/common";
@Resolver()
export class SearchSmResolver {
  constructor(private readonly searchSmService: SearchSmService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultSearchSM)
  async searchSM(
    @Context() context: any,
    @Args("modelType")
    modelType: string,
    @Args("lectureId", { type: () => Int, nullable: true })
    lectureId?: number,
    @Args("studentPaymentId", { type: () => Int, nullable: true })
    studentPaymentId?: number,
    @Args("subjectId", { type: () => Int, nullable: true })
    subjectId?: number,
    @Args("limit", { type: () => Int, nullable: true })
    limit?: number,
    @Args("page", { type: () => Int, nullable: true })
    page?: number,
  ): Promise<ResultSearchSM> {
    return this.searchSmService.searchSMFunc(
      context,
      modelType,
      lectureId,
      studentPaymentId,
      subjectId,
      limit,
      page,
    );
  }
}
