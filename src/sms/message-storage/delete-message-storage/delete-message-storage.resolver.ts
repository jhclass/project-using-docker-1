import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeleteMessageStorageService } from "./delete-message-storage.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class DeleteMessageStorageResolver {
  constructor(
    private readonly deleteMessageStorageService: DeleteMessageStorageService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteMessageStorage(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteMessageStorageService.deleteMessageStorageFunc(id);
  }
}
