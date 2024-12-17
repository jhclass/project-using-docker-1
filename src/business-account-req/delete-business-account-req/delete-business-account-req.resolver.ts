import { Args, Mutation, Resolver, Int } from "@nestjs/graphql";
import { DeleteBusinessAccountReqService } from "./delete-business-account-req.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DeleteBusinessAccountReqResolver {
  constructor(
    private readonly deleteBusinessAccountReqService: DeleteBusinessAccountReqService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteBusinessAccountReq(@Args("id", { type: () => Int }) id: number) {
    return this.deleteBusinessAccountReqService.deleteBusinessAccountReqFunc(
      id,
    );
  }
}
