import { Resolver, Query, Args, Int, Context } from "@nestjs/graphql";
import { SeeLecturesService } from "./see-lectures.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { SeeLecturesResult } from "../entity/lectures.entity";
@Resolver()
export class SeeLecturesResolver {
  constructor(private readonly seeLecturesService: SeeLecturesService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => SeeLecturesResult)
  async seeLectures(
    @Context() context: any,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
  ): Promise<SeeLecturesResult> {
    return this.seeLecturesService.seeLecturesFunc(context, page, limit);
  }
}
