import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeleteCareerService } from "./delete-career.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DeleteCareerResolver {
  constructor(private readonly deleteCareerService: DeleteCareerService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteCareer(
    @Args("id", { type: () => Int })
    id: number,
  ): Promise<CommonResponse> {
    return this.deleteCareerService.deleteCareerFunc(id);
  }
}
