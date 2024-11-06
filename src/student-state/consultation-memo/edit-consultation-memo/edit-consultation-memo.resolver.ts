import { UseGuards } from "@nestjs/common";
import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { EditConsultationMemoService } from "./edit-consultation-memo.service";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class EditConsultationMemoResolver {
  constructor(
    private readonly editConsultationMemoService: EditConsultationMemoService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async updateConsultationMemo(
    @Context() context: any,
    @Args("id", { type: () => Int }) id: number,
    @Args("content") content: string,
    @Args("lastModifiedTime", { nullable: true }) lastModifiedTime?: string,
  ): Promise<CommonResponse> {
    return this.editConsultationMemoService.editConsultationMemoFunc(
      context,
      id,
      content,
      lastModifiedTime,
    );
  }
}
