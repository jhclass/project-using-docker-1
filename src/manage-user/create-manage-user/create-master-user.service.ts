import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class CreateMasterUserService {
  constructor(private readonly client: PrismaService) {}
  async createMasterUserFunc(
    mUserId: string,
    mUsername: string,
    mPassword: string,
    branchName: string,
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
  ) {
    try {
      // branchName 검증
      const existingBranchName = await this.client.branch.findFirst({
        where: {
          branchName,
        },
      });
      if (!existingBranchName) {
        throw new NotFoundException(`branchName 을 다시 확인하세요.`);
      }
      const existingId = await this.client.manageUser.findFirst({
        where: {
          mUserId,
          branchId: existingBranchName.id,
        },
      });
      //console.log(existingId);
      if (existingId) {
        throw new BadRequestException(
          "아이디가 존재 합니다. 해당 브랜치에 마스터 아이디는 하나만 존재해야합니다.",
        );
      }
      const newPassword = await bcrypt.hash(mPassword, 10);
      await this.client.manageUser.create({
        data: {
          mUserId,
          mUsername,
          mPassword: newPassword,
          branchId: existingBranchName?.id,
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
        },
      });
      return {
        ok: true,
        message: `정상적으로 등록 완료 되었습니다.`,
      };
    } catch ({ message }) {
      console.error(message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${message}`,
      };
    }
  }
}
