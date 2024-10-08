import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Injectable()
export class DeleteManageUserService {
  constructor(private client: PrismaService) {}
  async deleteManageUserFunc(id: number): Promise<CommonResponse> {
    try {
      const existingId = await this.client.manageUser.findUnique({
        where: {
          id,
        },
      });
      if (!existingId) {
        throw new Error(`id가 존재하지 않습니다.`);
      }
      await this.client.manageUser.delete({
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
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
