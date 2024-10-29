import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { LoginService } from "./login.service";
import { ResultLogin } from "@src/result-dto/common-response.dto";

@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}
  @Mutation(() => ResultLogin)
  async mLogin(
    @Args("mUserId") mUserId: string,
    @Args("mPassword") mPassword: string,
  ): Promise<ResultLogin> {
    return this.loginService.loginFunc(mUserId, mPassword);
  }
}
