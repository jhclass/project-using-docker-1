import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class CreateManageUserService {
  constructor(private readonly client: PrismaService) {}
  async createManageUserFunc(
    context: any,
    mUserId: string,
    mUsername: string,
    mPassword: string,
    mGrade?: number,
    mRank?: string,
    mPart?: string[],
    mPhoneNum?: string,
    mPhoneNumCompany?: string,
    mPhoneNumFriend?: string,
    mPhoneNumInside?: string,
    mJoiningDate?: string,
    mAddresses?: string,
    email?: string,
    mZipCode?: string,
    mAddressDetail?: string,
    branchId?: number,
  ): Promise<CommonResponse> {
    try {
      const { user } = context.req;
      //console.log(user);
      branchId = branchId ?? user.branchId;
      // 이름 , 아이디 중복여부, 전화번호

      const existingUser = await this.client.manageUser.findFirst({
        where: {
          OR: [{ mUserId }, { mPhoneNum }, { mUsername }],
        },
      });
      if (existingUser) {
        throw new ConflictException(
          "아이디 또는 전화번호 또는 이름이 중복 되었습니다. 이름이 중복되었을 경우 이름 뒤에 숫자를 넣어 다른 이름으로 작성하여 주세요.",
        );
      }
      const hashedPassword = await bcrypt.hash(mPassword, 10);
      await this.client.manageUser.create({
        data: {
          mUserId,
          mUsername,
          mPassword: hashedPassword,
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
        },
      });
      return {
        ok: true,
        message: "정상적으로 등록 완료 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
