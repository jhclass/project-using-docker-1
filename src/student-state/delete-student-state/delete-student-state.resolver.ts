import { Context, Int, Mutation, Resolver, Args } from "@nestjs/graphql";
import { DeleteStudentStateService } from "./delete-student-state.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DeleteStudentStateResolver {
  constructor(
    private readonly deleteStudentStateService: DeleteStudentStateService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteStudentState(
    @Context() context: any,
    @Args("id", { type: () => [Int], nullable: "items" }) id: number[],
  ): Promise<CommonResponse> {
    return this.deleteStudentStateService.deleteStudentStateFunc(context, id);
  }
}
