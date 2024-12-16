import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { EditBusinessAccountReqService } from "./edit-business-account-req.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class EditBusinessAccountReqResolver {
  constructor(
    private readonly editBusinessAccountReqService: EditBusinessAccountReqService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editBusinessAccountReq(
    @Args("id", { type: () => Int }) id: number,
    @Args("creationComplete") creationComplete: string,
    @Args("rejection", { nullable: true }) rejection?: string,
  ): Promise<CommonResponse> {
    return this.editBusinessAccountReqService.editBusinessAccountReqFunc(
      id,
      creationComplete,
      rejection,
    );
  }
}
