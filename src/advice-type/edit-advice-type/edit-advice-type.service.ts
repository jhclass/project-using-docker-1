import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class EditAdviceTypeService {
  constructor(private readonly client: PrismaService) {}
  async editAdviceTypeFunc(
    id: number,
    onOff?: string,
    category?: string,
    defaultValue?: string,
  ) {
    try {
      const existingId = await this.client.adviceType.findUnique({
        where: { id },
      });
      validateIdExists(existingId);
      await this.client.adviceType.update({
        where: { id },
        data: {
          onOff,
          category,
          defaultValue,
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
