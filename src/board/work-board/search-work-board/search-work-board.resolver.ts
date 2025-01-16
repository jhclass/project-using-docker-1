import { Resolver, Query, Args, Context } from "@nestjs/graphql";
import { SearchWorkBoardService } from "./search-work-board.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { ResultSeeWorkBoard } from "../entity/work-board.entity";
import { SearchWorkBoardDto } from "./dto/search-work-board.dto";

@Resolver()
export class SearchWorkBoardResolver {
  constructor(
    private readonly searchWorkBoardService: SearchWorkBoardService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultSeeWorkBoard)
  async searchWorkBoard(
    @Context() context: any,
    @Args("searchWorkBoardDto") searchWorkBoardDto: SearchWorkBoardDto,
  ) {
    return this.searchWorkBoardService.searchWorkBoardFunc(
      context,
      searchWorkBoardDto,
    );
  }
}
