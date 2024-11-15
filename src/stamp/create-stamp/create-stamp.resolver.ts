import { Args, Context, Int, Query, Resolver } from "@nestjs/graphql";
import { CreateStampService } from "./create-stamp.service";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class CreateStampResolver {
  constructor(private readonly createStampService: CreateStampService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => CommonResponse)
  async createStamp(
    @Context() context: any,
    @Args("manageUserId", { type: () => Int })
    manageUserId: number,
  ): Promise<CommonResponse> {
    return this.createStampService.createStampFunc(context, manageUserId);
  }
}
