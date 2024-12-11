import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class EditRegularEvaluationSetService {
  constructor(private readonly client: PrismaService) {}
  async editRegularEvaluationSetFunc(
    context: any,
    id: number,
    statusType: string,
    evaluationDetails: string,
    points: number,
    lastModifiedTime: string,
  ) {
    try {
      if (!id || !lastModifiedTime) {
        throw new BadRequestException(
          "id 와 lastModifiedTime 은 필수값 입니다.",
        );
      }
      const client = this.client;
      const { user } = context.req;
      //checking id
      const existingId = await client.regularEvaluationSet.findUnique({
        where: { id },
      });
      validateIdExists(existingId);
      await client.regularEvaluationSet.update({
        where: { id },
        data: {
          statusType,
          evaluationDetails,
          points,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
          lastModifiedTime,
        },
      });
      return {
        ok: true,
        message: "정상적으로 수정 완료 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        error: `Error:${error.message}`,
        message: "에러발생! 에러메세지를 확인하세요.",
      };
    }
  }
}
