import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { CreateMessageStorageService } from "./create-message-storage.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class CreateMessageStorageResolver {
  constructor(
    private readonly createMessageStorageService: CreateMessageStorageService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createMessageStorage(
    @Context()
    context: any,
    @Args("message")
    message?: string,
    @Args("saveType")
    saveType?: string,
  ): Promise<CommonResponse> {
    return this.createMessageStorageService.createMessageStorageFunc(
      context,
      message,
      saveType,
    );
  }
}
