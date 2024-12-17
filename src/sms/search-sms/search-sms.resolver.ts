import { Args, Context, Query, Resolver, Int } from "@nestjs/graphql";
import { SearchSmsService } from "./search-sms.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { ResultSearchSms } from "@src/sms/entity/sms.entity";

@Resolver()
export class SearchSmsResolver {
  constructor(private readonly searchSmsService: SearchSmsService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultSearchSms)
  async searchSms(
    @Context()
    context: any,
    @Args("id", { type: () => Int, nullable: true })
    id?: number,
    @Args("branchId", { type: () => Int, nullable: true })
    branchId?: number,
    @Args("receiver", { nullable: true })
    receiver?: string,
    @Args("manageUserId", { type: () => Int, nullable: true })
    manageUserId?: number,
    @Args("period", { type: () => [String], nullable: "itemsAndList" })
    period?: string[],
    @Args("page", { type: () => Int, nullable: true })
    page?: number,
    @Args("limit", { type: () => Int, nullable: true })
    limit?: number,
    @Args("saveType", { nullable: true })
    saveType?: string,
  ): Promise<ResultSearchSms> {
    return this.searchSmsService.searchSmsFunc(
      context,
      id,
      branchId,
      receiver,
      manageUserId,
      period,
      page,
      limit,
      saveType,
    );
  }
}
