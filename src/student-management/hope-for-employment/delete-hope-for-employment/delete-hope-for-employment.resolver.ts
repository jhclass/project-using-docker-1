import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeleteHopeForEmploymentService } from "./delete-hope-for-employment.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DeleteHopeForEmploymentResolver {
  constructor(
    private readonly deleteHopeForEmploymentService: DeleteHopeForEmploymentService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteHopeForEmployment(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteHopeForEmploymentService.deleteHopeForEmploymentFunc(id);
  }
}
