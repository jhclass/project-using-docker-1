import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class EditEduInfomationService {
  constructor(private readonly client: PrismaService) {}
  async editEduInfomationFunc(
    context: any,
    id: number,
    lastModifiedTime: string,
    eduType?: string,
    eduName?: string,
    major?: string,
    graduationStatus?: string,
  ) {
    try {
      if (!id || !lastModifiedTime) {
        throw new Error("id 와 lastModifiedTime 은 필수값 입니다.");
      }
      const { user } = context.req;
      const client = this.client;
      //id
      const existingId = await client.eduInfomation.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
      await client.eduInfomation.update({
        where: {
          id,
        },
        data: {
          eduType,
          eduName,
          major,
          graduationStatus,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
          lastModifiedTime,
        },
      });

      return {
        ok: true,
        message: "정상적으로 수정되었습니다.",
      };
    } catch ({ message }) {
      console.error(message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요",
        error: `Error:${message}`,
      };
    }
  }
}
