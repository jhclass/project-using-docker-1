import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { generateRandomFourDigitNumber } from "@src/utils/shared.utils";

@Injectable()
export class CreateBranchService {
  constructor(private readonly client: PrismaService) {}
  async createBranchServiceFunc(branchName: string) {
    try {
      const randomInt = generateRandomFourDigitNumber();
      const newBranchName = `${branchName + "_" + randomInt}`;
      //branchName
      const existbranchName = await this.client.branch.findFirst({
        where: {
          branchName: newBranchName,
        },
      });

      // random
      if (existbranchName) {
        throw new Error(`알수없는 오류가 발생하였습니다. 다시 생성 해주세요.`);
      }
      await this.client.branch.create({
        data: {
          branchName: newBranchName,
        },
      });
      return { ok: true, message: `정상적으로 생성 완료 되었습니다.` };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error: ${error.message}`,
      };
    }
  }
}
