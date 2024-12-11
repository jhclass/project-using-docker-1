import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class DeleteBranchService {
  constructor(private readonly client: PrismaService) {}
  async deleteBranchFunc(id: number) {
    try {
      const existingId = await this.client.branch.findUnique({ where: { id } });
      validateIdExists(existingId);
      await this.client.branch.delete({
        where: { id },
      });
      return {
        ok: true,
        message: `정상적으로 삭제 완료 되었습니다.`,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인해주세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
