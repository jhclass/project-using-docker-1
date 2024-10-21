import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { RefreshTokenService } from "./refresh-token.service";
import { ResultRefreshToken } from "@src/result-dto/common-response.dto";

@Resolver()
export class RefreshTokenResolver {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}
  @Mutation(() => ResultRefreshToken)
  async refreshToken(
    @Args("refreshToken") refreshToken: string,
  ): Promise<ResultRefreshToken> {
    return this.refreshTokenService.refreshTokenFunc(refreshToken);
  }
}
