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
    mAvatar?: string,
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
          mAvatar,
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
  async devEditManageUserFunc(
    context: any,
    mUserId: string[],
    mUsername: string,
    mPassword: string,
    mGrade: number,
    mRank: string,
    mPhoneNum: string,
    mPhoneNumCompany: string,
    mPhoneNumInside: string,
    mPhoneNumFriend: string,
    mPart: string[],
    mAvatar: string,
    mJoiningDate: string,
    mAddresses: string,
    resign: string,
    email: string,
  ) {
    try {
      const { user } = context.req;
      //개발자가 아니라면 사용할수 없음
      const areYouDevOk = await this.client.manageUser.findFirst({
        where: {
          id: user?.id,
          mGrade: 0,
        },
      });
      if (!areYouDevOk) {
        //개발자이외엔 사용할수 없음.
        throw new Error("개발자이외엔 사용할수 없음.");
      }

      const newPassword = mPassword;

      let uglyPassword: string | null = null;
      if (newPassword) {
        try {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        } catch (error) {
          throw new Error("비밀번호 해싱 중 문제가 발생했습니다.");
        }
      }
      // 데이터 수정
      await this.client.manageUser.updateMany({
        where: {
          mUserId: {
            in: mUserId,
          },
        },
        data: {
          mUsername,
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
          email,
          resign,
          ...(uglyPassword && { mPassword: uglyPassword }),
          lastModifiedBy: user
            ? `${user.mUserId}(${user.mUsername})`
            : "Unknown",
        },
      });
      return {
        ok: true,
        message: "수정완료 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
