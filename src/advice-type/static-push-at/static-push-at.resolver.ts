import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { StaticPushAtService } from "./static-push-at.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class StaticPushAtResolver {
  constructor(private readonly staticPushAtService: StaticPushAtService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async staticPushAT(
    @Args("id", { type: () => Int }) id: number,
    @Args("onOff", { nullable: true }) onOff?: string,
  ): Promise<CommonResponse> {
    return this.staticPushAtService.staticPushAtFunc(id, onOff);
  }
}
