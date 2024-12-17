import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { CreateConsultationMemoService } from "./create-consultation-memo.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateConsultationMemoResolver {
  constructor(
    private readonly createConsultationMemoService: CreateConsultationMemoService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createConsultationMemo(
    @Context() context: any,
    @Args("content") content: string,
    @Args("studentStateId", { type: () => Int }) studentStateId: number,
  ): Promise<CommonResponse> {
    return this.createConsultationMemoService.createConsultationMemoFunc(
      context,
      content,
      studentStateId,
    );
  }
}
