import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { RefreshTokenService } from "./refresh-token.service";
import { ResultRefreshToken } from "@src/result-dto/common-response.dto";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

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
