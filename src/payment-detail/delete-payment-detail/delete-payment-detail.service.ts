import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class DeletePaymentDetailService {
  constructor(private readonly client: PrismaService) {}
  async deletePaymentDetailFunc(id: number) {
    try {
      if (!id) {
        throw new Error("id 는 필수값 입니다. 다시 확인하세요.");
      }
      const existingId = await this.client.paymentDetail.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
      await this.client.paymentDetail.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
        message: `정상적으로 삭제완료 되었습니다.`,
      };
    } catch (error) {
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
