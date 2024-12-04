import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditCareerService {
  constructor(private readonly client: PrismaService) {}
  async editCareerFunc(
    context: any,
    id: number,
    careerDetails: string,
    lastModifiedTime?: string,
  ) {
    try {
      if (!id || !careerDetails || !lastModifiedTime) {
        throw new Error(
          "필수값을 확인하세요. id,careerDetails 는 필수값으로 들어가야 합니다.",
        );
      }
      const client = this.client;
      const { user } = context.req;
      //id 확인
      const existingId = await client.career.findUnique({
        where: {
          id,
        },
      });
      if (!existingId) {
        throw new Error("존재하지 않는 id 입니다. 확인이 필요합니다.");
      }
      await client.career.update({
        where: {
          id,
        },
        data: {
          careerDetails,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
          lastModifiedTime,
        },
      });
      return {
        ok: true,
        message: "정상적으로 데이터가 수정되었습니다.",
      };
      //수정
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
