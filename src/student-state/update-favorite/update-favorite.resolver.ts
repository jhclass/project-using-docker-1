import { Args, Mutation, Resolver, Int, Context } from "@nestjs/graphql";
import { UpdateFavoriteService } from "./update-favorite.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UpdateFavoriteResult } from "@src/student-state/entity/studentState.entity";

@Resolver()
export class UpdateFavoriteResolver {
  constructor(private readonly updateFavoriteService: UpdateFavoriteService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => UpdateFavoriteResult)
  async updateFavorite(
    @Context() context: any,
    @Args("id", { type: () => Int }) id: number,
  ) {
    return this.updateFavoriteService.updateFavoriteFunc(context, id);
  }
}
