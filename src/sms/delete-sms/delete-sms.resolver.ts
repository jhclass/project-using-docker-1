import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeleteSmsService } from "./delete-sms.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class DeleteSmsResolver {
  constructor(private readonly deleteSmsService: DeleteSmsService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteSms(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteSmsService.deleteSmsFunc(id);
  }
}
