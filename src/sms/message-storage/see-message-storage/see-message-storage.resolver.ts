import { Args, Context, Int, Query, Resolver } from "@nestjs/graphql";
import { SeeMessageStorageService } from "./see-message-storage.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { ResultMessageStorage } from "@src/result-dto/common-response.dto";

@Resolver()
export class SeeMessageStorageResolver {
  constructor(
    private readonly seeMessageStorageService: SeeMessageStorageService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultMessageStorage)
  async seeMessageStorage(
    @Context() context: any,
    @Args("saveType")
    saveType: string,
    @Args("page", { type: () => Int, nullable: true })
    page?: number,
    @Args("limit", { type: () => Int, nullable: true })
    limit?: number,
  ): Promise<ResultMessageStorage> {
    return this.seeMessageStorageService.seeMessageStorageFunc(
      context,
      saveType,
      page,
      limit,
    );
  }
}
