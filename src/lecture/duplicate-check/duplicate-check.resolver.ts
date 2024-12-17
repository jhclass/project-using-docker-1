import { Resolver, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { DuplicateCheckService } from "./duplicate-check.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DuplicateCheckResolver {
  constructor(private readonly duplicateCheckService: DuplicateCheckService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async duplicateCheck(
    @Context() context: any,
    @Args("studentId", { type: () => Int }) studentId: number,
    @Args("subjectId", { type: () => Int }) subjectId: number,
  ): Promise<CommonResponse> {
    return this.duplicateCheckService.duplicateCheckFunc(
      context,
      studentId,
      subjectId,
    );
  }
}
