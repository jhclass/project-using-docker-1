import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Context } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { StudentState } from "@src/result-dto/studentState.dto";
import { SeeFavoriteService } from "./see-favorite.service";

@Resolver()
export class SeeFavoriteResolver {
  constructor(private readonly seeFavoriteService: SeeFavoriteService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => [StudentState])
  async seeFavorite(@Context() context: any) {
    return this.seeFavoriteService.seeFavoriteFunc(context);
  }
}
