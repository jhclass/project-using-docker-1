import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { CreateStudentMemoService } from "./create-student-memo.service";

@Resolver()
export class CreateStudentMemoResolver {
  constructor(
    private readonly createStudentMemoService: CreateStudentMemoService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createStudentMemo(
    @Context() context: any,
    @Args("content")
    content: string,
    @Args("studentId", { type: () => Int })
    studentId: number,
  ) {
    return this.createStudentMemoService.createStudentMemoFunc(
      context,
      content,
      studentId,
    );
  }
}
