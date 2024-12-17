import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { RefreshTokenService } from "./refresh-token.service";
import { ResultRefreshToken } from "@src/refresh-token/entity/refresh-token.entity";
import { UseGuards } from "@nestjs/common";

import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class RefreshTokenResolver {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => ResultRefreshToken)
  async refreshToken(
    @Args("refreshToken") refreshToken: string,
  ): Promise<ResultRefreshToken> {
    return this.refreshTokenService.refreshTokenFunc(refreshToken);
  }
}
