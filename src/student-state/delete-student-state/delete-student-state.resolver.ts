import { Context, Int, Mutation, Resolver, Args } from "@nestjs/graphql";
import { DeleteStudentStateService } from "./delete-student-state.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class DeleteStudentStateResolver {
  constructor(
    private readonly deleteStudentStateService: DeleteStudentStateService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteStudentState(
    @Context() context: any,
    @Args("id", { type: () => [Int] }) id: number[],
  ): Promise<CommonResponse> {
    return this.deleteStudentStateService.deleteStudentStateFunc(context, id);
  }
}