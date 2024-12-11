import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import {
  generateRandomFourDigitNumber,
  validateIdExists,
} from "@src/utils/shared.utils";

@Injectable()
export class EditBranchService {
  constructor(private readonly client: PrismaService) {}
  async editBranchServiceFunc(id: number, newBranchName: string) {
    try {
      const existingBranchName = await this.client.branch.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingBranchName);
      const randonInt = generateRandomFourDigitNumber();
      newBranchName = `${newBranchName + "_" + randonInt}`;
      await this.client.branch.update({
        where: { id },
        data: {
          branchName: newBranchName,
        },
      });
      return {
        ok: true,
        message: `정상적으로 수정 완료 되었습니다.`,
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
