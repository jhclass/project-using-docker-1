import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SearchManageUserService } from "@src/manage-user/search-manage-user/search-manage-user.service";
import { SearchManageUserResult } from "@src/result-dto/common-response.dto";

@Resolver()
export class SearchManageUserResolver {
  constructor(private searchManageUserService: SearchManageUserService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => SearchManageUserResult)
  async searchManageUser(
    @Args("id", { type: () => Int, nullable: true }) id?: number,
    @Args("mUserId", { nullable: true }) mUserId?: string,
    @Args("mUsername", { nullable: true }) mUsername?: string,
    @Args("mGrade", { type: () => Int, nullable: true }) mGrade?: number,
    @Args("mRank", { nullable: true }) mRank?: string,
    @Args("mPhoneNum", { nullable: true }) mPhoneNum?: string,
    @Args("mPart", { nullable: true }) mPart?: string,
    @Args("resign", { nullable: true }) resign?: string,
    @Args("mJoiningDate", { type: () => [String], nullable: "itemsAndList" })
    mJoiningDate?: string[],
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
  ): Promise<SearchManageUserResult> {
    return this.searchManageUserService.searchManageUserFunc(
      id,
      mUserId,
      mUsername,
      mGrade,
      mRank,
      mPhoneNum,
      mPart,
      resign,
      mJoiningDate,
      limit,
      page,
    );
  }
}
