import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeleteAdviceTypeService } from "./delete-advice-type.service";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class DeleteAdviceTypeResolver {
  constructor(
    private readonly deleteAdviceTypeService: DeleteAdviceTypeService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteAdviceType(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteAdviceTypeService.deleteAdviceTypeFunc(id);
  }
}
