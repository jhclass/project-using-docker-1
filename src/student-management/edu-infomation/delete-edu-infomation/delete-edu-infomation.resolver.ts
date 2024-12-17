import { Resolver, Mutation, Args, Int } from "@nestjs/graphql";
import { DeleteEduInfomationService } from "./delete-edu-infomation.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DeleteEduInfomationResolver {
  constructor(
    private readonly deleteEduInfomationService: DeleteEduInfomationService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteEduInfomation(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteEduInfomationService.deleteEduInfomationFunc(id);
  }
}
