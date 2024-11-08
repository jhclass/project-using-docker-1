import { Query, Args, Context, Resolver, Int } from "@nestjs/graphql";
import { SeeSubjectService } from "./see-subject.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SeeSubjectResult } from "@src/result-dto/common-response.dto";
@Resolver()
export class SeeSubjectResolver {
  constructor(private readonly seeSubjectService: SeeSubjectService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => SeeSubjectResult)
  async seeSubject(
    @Context() context: any,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
  ): Promise<SeeSubjectResult> {
    return this.seeSubjectService.seeSubjectFunc(context, page, limit);
  }
}
