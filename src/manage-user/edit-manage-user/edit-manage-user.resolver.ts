import { Resolver, Mutation, Args, Int } from "@nestjs/graphql";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { EditManageUserService } from "@src/manage-user/edit-manage-user/edit-manage-user.service";
@Resolver()
export class EditManageUserResolver {
  constructor(private editManageUserService: EditManageUserService) {}
  @Mutation(() => CommonResponse)
  async editManageUser(
    @Args({ name: "id", type: () => Int }) id: number,
    @Args("mUsername", { nullable: true }) mUsername?: string,
    @Args("mPassword", { nullable: true }) mPassword?: string,
    @Args({ name: "mGrade", type: () => Int, nullable: true }) mGrade?: number,
    @Args("mRank", { nullable: true }) mRank?: string,
    @Args("mPhoneNum", { nullable: true }) mPhoneNum?: string,
    @Args("mPhoneNumCompany", { nullable: true }) mPhoneNumCompany?: string,
    @Args("mPhoneNumInside", { nullable: true }) mPhoneNumInside?: string,
    @Args("mPhoneNumFriend", { nullable: true }) mPhoneNumFriend?: string,
    @Args({ name: "mPart", type: () => [String], nullable: true })
    mPart?: string[],
    @Args("mJoiningDate", { nullable: true }) mJoiningDate?: string,
    @Args("mAddresses", { nullable: true }) mAddresses?: string,
    @Args("email", { nullable: true }) email?: string,
    @Args("resign", { nullable: true }) resign?: string,
    @Args("mZipCode", { nullable: true }) mZipCode?: string,
    @Args("mAddressDetail", { nullable: true }) mAddressDetail?: string,
    @Args("lastModifiedTime", { nullable: true }) lastModifiedTime?: string,
  ): Promise<CommonResponse> {
    return this.editManageUserService.editManageUserFunc(
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
    );
  }
}
