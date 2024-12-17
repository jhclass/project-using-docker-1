import { Context, Int, Resolver, Mutation, Args } from "@nestjs/graphql";
import { DeleteLecturesService } from "./delete-lectures.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/common-entity/common-response.entity";
@Resolver()
export class DeleteLecturesResolver {
  constructor(private readonly deleteLecturesService: DeleteLecturesService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteLectures(
    @Context() context: any,
    @Args("id", { type: () => Int }) id: number,
  ) {
    return this.deleteLecturesService.deleteLecturesFunc(context, id);
  }
}
