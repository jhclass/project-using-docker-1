import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
@Injectable()
export class EditManageUserService {
  constructor(private readonly client: PrismaService) {}
  async editManageUserFunc(
    context: any,
    id: number,
    mUsername?: string,
    mPassword?: string,
    mGrade?: number,
    mRank?: string,
    mPhoneNum?: string,
    mPhoneNumCompany?: string,
    mPhoneNumInside?: string,
    mPhoneNumFriend?: string,
    mPart?: string[],
    mJoiningDate?: string,
    mAddresses?: string,
    email?: string,
    resign?: string,
    mZipCode?: string,
    mAddressDetail?: string,
    lastModifiedTime?: string,
    branchId?: number,
  ) {
    try {
      const { user } = context.req;
      branchId = branchId ?? user.branchId;
      const existingId = await this.client.manageUser.findUnique({
        where: {
          id,
        },
      });
      if (!existingId) {
        throw new Error(`id 가 없습니다.`);
      }
      let hashedPassword: string;
      if (mPassword) {
        hashedPassword = await bcrypt.hash(mPassword, 10);
      }

      await this.client.manageUser.update({
        where: { id },
        data: {
          mUsername,
          mPassword: hashedPassword,
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
        },
      });
      return {
        ok: true,
        message: "정상적으로 수정 완료 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: true,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
