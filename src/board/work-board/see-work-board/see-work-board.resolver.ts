import { Args, Context, Int, Query, Resolver } from "@nestjs/graphql";
import { SeeWorkBoardService } from "./see-work-board.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { ResultSeeWorkBoard } from "../entity/work-board.entity";

@Resolver()
export class SeeWorkBoardResolver {
  constructor(private readonly seeWorkBoardService: SeeWorkBoardService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultSeeWorkBoard)
  async seeWorkBoard(
    @Context() context: any,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
  ): Promise<ResultSeeWorkBoard> {
    return this.seeWorkBoardService.seeWorkBoardFunc(context, page, limit);
  }
}
