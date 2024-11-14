import { Args, Mutation, Resolver, Int, Context } from "@nestjs/graphql";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { CreateManageUserService } from "@src/manage-user/create-manage-user/create-manage-user.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class CreateManageUserResolver {
  constructor(private createManageUserService: CreateManageUserService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  createManagerAccount(
    @Context() context: any,
    @Args("mUserId") mUserId: string,
    @Args("mUsername") mUsername: string,
    @Args("mPassword") mPassword: string,
    @Args("mGrade", { type: () => Int, nullable: true }) mGrade?: number,
    @Args("mRank", { nullable: true }) mRank?: string,
    @Args({ name: "mPart", type: () => [String], nullable: "itemsAndList" })
    mPart?: string[],
    @Args("mPhoneNum", { nullable: true }) mPhoneNum?: string,
    @Args("mPhoneNumCompany", { nullable: true }) mPhoneNumCompany?: string,
    @Args("mPhoneNumFriend", { nullable: true }) mPhoneNumFriend?: string,
    @Args("mPhoneNumInside", { nullable: true }) mPhoneNumInside?: string,
    @Args("mJoiningDate", { nullable: true }) mJoiningDate?: string,
    @Args("mAddresses", { nullable: true }) mAddresses?: string,
    @Args("email", { nullable: true }) email?: string,
    @Args("mZipCode", { nullable: true }) mZipCode?: string,
    @Args("mAddressDetail", { nullable: true }) mAddressDetail?: string,
    @Args("branchId", { type: () => Int, nullable: true }) branchId?: number,
  ): Promise<CommonResponse> {
    return this.createManageUserService.createManageUserFunc(
      context,
      mUserId,
      mUsername,
      mPassword,
      mGrade,
      mRank,
      mPart,
      mPhoneNum,
      mPhoneNumCompany,
      mPhoneNumFriend,
      mPhoneNumInside,
      mJoiningDate,
      mAddresses,
      email,
      mZipCode,
      mAddressDetail,
      branchId,
    );
  }
}
