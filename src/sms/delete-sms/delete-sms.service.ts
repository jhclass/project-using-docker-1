import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class DeleteSmsService {
  constructor(private readonly client: PrismaService) {}
  async deleteSmsFunc(id: number) {
    try {
      const client = this.client;

      const existingId = await client.sms.findUnique({ where: { id } });
      validateIdExists(existingId);
      await client.sms.delete({
        where: { id },
      });
      return {
        ok: true,
        message: "정상적으로 삭제 되었습니다.",
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
