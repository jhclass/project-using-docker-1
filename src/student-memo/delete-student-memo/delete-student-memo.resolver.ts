import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeleteStudentMemoService } from "./delete-student-memo.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DeleteStudentMemoResolver {
  constructor(
    private readonly deleteStudentMemoService: DeleteStudentMemoService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteStudentMemo(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteStudentMemoService.deleteStudentMemoFunc(id);
  }
}
