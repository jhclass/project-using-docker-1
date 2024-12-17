import { Args, Context, Mutation, Resolver, Int } from "@nestjs/graphql";
import { EditStudentMemoService } from "./edit-student-memo.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class EditStudentMemoResolver {
  constructor(
    private readonly editStudentMemoService: EditStudentMemoService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editStudentMemo(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("content")
    content: string,
    @Args("lastModifiedTime")
    lastModifiedTime: string,
  ): Promise<CommonResponse> {
    return this.editStudentMemoService.editStudentMemoFunc(
      context,
      id,
      content,
      lastModifiedTime,
    );
  }
}
