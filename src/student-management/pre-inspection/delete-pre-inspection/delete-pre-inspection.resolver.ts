import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeletePreInspectionService } from "./delete-pre-inspection.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class DeletePreInspectionResolver {
  constructor(
    private readonly deletePreInspectionService: DeletePreInspectionService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deletePreInspection(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deletePreInspectionService.deletePreInspectionFunc(id);
  }
}
