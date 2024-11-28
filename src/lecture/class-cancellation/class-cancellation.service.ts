import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class ClassCancellationService {
  constructor(private readonly client: PrismaService) {}
  async classCancellationFunc(
    context: any,
    id: number,
    courseComplete: string,
    dateOfDroppingOut?: string,
    reasonFordroppingOut?: string,
    lastModifiedTime?: string,
  ) {
    try {
      if (!id || !lastModifiedTime || !courseComplete) {
        throw new Error("id 와 lastModifiedTime 은 필수값 입니다.");
      }
      const { user } = context.req;
      const client = this.client;
      const existingId = await client.studentPayment.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
      await client.studentPayment.update({
        where: {
          id,
        },
        data: {
          courseComplete,
          dateOfDroppingOut,
          reasonFordroppingOut,
          lastModifiedTime,
          lastModifiedByName: user?.mUsername,
          lastModifiedByUserId: user?.mUserId,
        },
      });
      return {
        ok: true,
        message: "정상적으로 데이터가 입력되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message:
          "에러발생! 데이터가 저장되지 않았습니다. 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
