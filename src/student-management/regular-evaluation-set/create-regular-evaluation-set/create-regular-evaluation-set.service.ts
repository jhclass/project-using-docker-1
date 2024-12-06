import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateRegularEvaluationSetService {
  constructor(private readonly client: PrismaService) {}
  async createRegularEvaluationSetFunc(
    context: any,
    statusType: string,
    evaluationDetails: string,
    points: number,
    subjectId: number,
  ) {
    try {
      if (!statusType || !evaluationDetails || !points || !subjectId) {
        throw new Error(
          "필수값을 확인하세요. 모든 데이터는 필수값으로 들어가야 합니다. ",
        );
      }
      const client = this.client;
      const { user } = context.req;
      //subjectId 확인
      const existingSubjectId = await client.subject.findUnique({
        where: {
          id: subjectId,
        },
        include: {
          lectures: true,
        },
      });
      const existingManageUserId = await client.manageUser.findUnique({
        where: {
          id: user?.id,
        },
      });
      if (!existingSubjectId) {
        throw new Error("subjectId 를 다시 확인하세요.");
      } else if (!existingManageUserId) {
        throw new Error(
          "manageUserId 를 다시 확인하세요. 지금 로그인이 되어있는 상태가 맞습니까?",
        );
      } else if (!existingSubjectId.lectures) {
        throw new Error(
          "강의배정이 되지 않았습니다. 강의배정을 하고 다시 시도 하세요.",
        );
      }
      await client.regularEvaluationSet.create({
        data: {
          lectureId: existingSubjectId?.lectures?.id,
          statusType,
          evaluationDetails,
          points,
          subjectId,
          branchId: user?.branchId,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
        },
      });
      return {
        ok: true,
        message: "정상적으로 생성 완료 되었습니다.",
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
