import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { RefreshTokenService } from "./refresh-token.service";
import { ResultRefreshToken } from "@src/result-dto/common-response.dto";
import { UseGuards } from "@nestjs/common";
import { RefreshTokenGuard } from "@src/auth/refresh-token-guard";

@Resolver()
export class RefreshTokenResolver {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => ResultRefreshToken)
  async refreshToken(
    @Args("refreshToken") refreshToken: string,
  ): Promise<ResultRefreshToken> {
    return this.refreshTokenService.refreshTokenFunc(refreshToken);
  }
}
