import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class DeleteBranchService {
  constructor(private readonly client: PrismaService) {}
  async deleteBranchFunc(id: number) {
    try {
      const existingId = await this.client.branch.findUnique({ where: { id } });
      if (!existingId) {
        throw new Error(`id 가 존재하지 않습니다 확인해주세요.`);
      }
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
