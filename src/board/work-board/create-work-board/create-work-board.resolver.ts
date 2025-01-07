import { Mutation, Resolver, Args, Context } from "@nestjs/graphql";
import { CreateWorkBoardService } from "./create-work-board.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CreateWorkBoardDto } from "./dto/create-work-board.dto";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateWorkBoardResolver {
  constructor(
    private readonly createWorkBoardService: CreateWorkBoardService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createWorkBoard(
    @Context() context: any,
    @Args("createWorkBoardDto") createWorkBoardDto: CreateWorkBoardDto,
  ) {
    return this.createWorkBoardService.createWorkBoardFunc(
      context,
      createWorkBoardDto,
    );
  }
}
