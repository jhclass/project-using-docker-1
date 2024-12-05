import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class EditHopeForEmploymentService {
  constructor(private readonly client: PrismaService) {}
  async editHopeForEmploymentFunc(
    context: any,
    id: number,
    fieldOfHope: string,
    hopefulReward: number,
    workType: string,
    workingHours: number,
    opinion: string,
    lastModifiedTime: string,
    workingArea?: string,
  ) {
    try {
      if (!id || !lastModifiedTime) {
        throw new Error("id 와 lastModifiedTime 은 필수값 입니다.");
      }
      //
      const { user } = context.req;
      const client = this.client;

      const existingId = await client.hopeForEmployment.findUnique({
        where: { id },
      });
      validateIdExists(existingId);
      await client.hopeForEmployment.update({
        where: { id },
        data: {
          workingArea,
          fieldOfHope,
          hopefulReward,
          workType,
          workingHours,
          opinion,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
          lastModifiedTime,
        },
      });
      return {
        ok: true,
        message: "정상적으로 등록완료 되었습니다.",
      };
    } catch (e) {
      console.error(e.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${e.message}`,
      };
    }
  }
}
