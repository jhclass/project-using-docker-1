import { Resolver, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { EditManageUserService } from "@src/manage-user/edit-manage-user/edit-manage-user.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
@Resolver()
export class EditManageUserResolver {
  constructor(private editManageUserService: EditManageUserService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editManageUser(
    @Context() context: any,
    @Args({ name: "id", type: () => Int }) id: number,
    @Args("mUsername", { nullable: true }) mUsername?: string,
    @Args("mPassword", { nullable: true }) mPassword?: string,
    @Args({ name: "mGrade", type: () => Int, nullable: true }) mGrade?: number,
    @Args("mRank", { nullable: true }) mRank?: string,
    @Args("mPhoneNum", { nullable: true }) mPhoneNum?: string,
    @Args("mPhoneNumCompany", { nullable: true }) mPhoneNumCompany?: string,
    @Args("mPhoneNumInside", { nullable: true }) mPhoneNumInside?: string,
    @Args("mPhoneNumFriend", { nullable: true }) mPhoneNumFriend?: string,
    @Args({ name: "mPart", type: () => [String], nullable: "itemsAndList" })
    mPart?: string[],
    @Args("mJoiningDate", { nullable: true }) mJoiningDate?: string,
    @Args("mAddresses", { nullable: true }) mAddresses?: string,
    @Args("email", { nullable: true }) email?: string,
    @Args("resign", { nullable: true }) resign?: string,
    @Args("mZipCode", { nullable: true }) mZipCode?: string,
    @Args("mAddressDetail", { nullable: true }) mAddressDetail?: string,
    @Args("lastModifiedTime", { nullable: true }) lastModifiedTime?: string,
    @Args("branchId", { type: () => Int, nullable: true }) branchId?: number,
    @Args("mAvatar", { type: () => String, nullable: true }) mAvatar?: string,
  ): Promise<CommonResponse> {
    return this.editManageUserService.editManageUserFunc(
      context,
      id,
      mUsername,
      mPassword,
      mGrade,
      mRank,
      mPhoneNum,
      mPhoneNumCompany,
      mPhoneNumInside,
      mPhoneNumFriend,
      mPart,
      mJoiningDate,
      mAddresses,
      email,
      resign,
      mZipCode,
      mAddressDetail,
      lastModifiedTime,
      branchId,
      mAvatar,
    );
  }
  async devEditManageUser(
    @Context() context: any,
    @Args("mUserId", { type: () => [String], nullable: "itemsAndList" })
    mUserId?: string[],
    @Args("mUsername", { nullable: true })
    mUsername?: string,
    @Args("mPassword", { nullable: true })
    mPassword?: string,
    @Args("mGrade", { type: () => Int, nullable: true })
    mGrade?: number,
    @Args("mRank", { nullable: true })
    mRank?: string,
    @Args("mPhoneNum", { nullable: true })
    mPhoneNum?: string,
    @Args("mPhoneNumCompany", { nullable: true })
    mPhoneNumCompany?: string,
    @Args("mPhoneNumInside", { nullable: true })
    mPhoneNumInside?: string,
    @Args("mPhoneNumFriend", { nullable: true })
    mPhoneNumFriend?: string,
    @Args("mPart", { type: () => [String], nullable: "itemsAndList" })
    mPart?: string[],
    @Args("mAvatar", { nullable: true })
    mAvatar?: string,
    @Args("mJoiningDate", { nullable: true })
    mJoiningDate?: string,
    @Args("mAddresses", { nullable: true })
    mAddresses?: string,
    @Args("resign", { nullable: true })
    resign?: string,
    @Args("email", { nullable: true })
    email?: string,
  ): Promise<CommonResponse> {
    return this.editManageUserService.devEditManageUserFunc(
      context,
      mUserId,
      mUsername,
      mPassword,
      mGrade,
      mRank,
      mPhoneNum,
      mPhoneNumCompany,
      mPhoneNumInside,
      mPhoneNumFriend,
      mPart,
      mAvatar,
      mJoiningDate,
      mAddresses,
      resign,
      email,
    );
  }
}
