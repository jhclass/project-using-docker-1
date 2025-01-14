import { Args, Resolver, Mutation } from "@nestjs/graphql";
import { CreateBusinessAccountReqService } from "./create-business-account-req.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { Public } from "@src/public-decorator/public-decorator.decorator";

@Resolver()
export class CreateBusinessAccountReqResolver {
  constructor(
    private readonly createBusinessACountReqService: CreateBusinessAccountReqService,
  ) {}
  @Public()
  @Mutation(() => CommonResponse)
  async createBusinessAccountReq(
    @Args("companyName") companyName: string,
    @Args("phoneNum")
    phoneNum: string,
    @Args("validate")
    validate: string,
    @Args("email")
    email: string,
    @Args("agree")
    agree: string,
    @Args("filePath", { type: () => [String], nullable: "items" })
    filePath?: string[],
  ): Promise<CommonResponse> {
    return this.createBusinessACountReqService.createBuninessAccountReqFunc(
      companyName,
      phoneNum,
      validate,
      email,
      agree,
      filePath,
    );
  }
}
