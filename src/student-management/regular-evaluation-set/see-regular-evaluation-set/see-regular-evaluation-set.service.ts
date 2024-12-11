import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface IWhere {
  subjectId: number;
  lectureId: number;
}
@Injectable()
export class SeeRegularEvaluationSetService {
  constructor(private readonly client: PrismaService) {}
  async seeRegularEvaluationSetFunc(
    lectureId?: number,
    subjectId?: number,
    page?: number,
    limit?: number,
  ) {
    try {
      const client = this.client;

      const pageNum = page || 1;
      const take = limit || 10;
      if (subjectId) {
        const existingSubjectId = await client.subject.findUnique({
          where: { id: subjectId },
        });
        if (!existingSubjectId) {
          throw new NotFoundException(
            "subjectId 가 유효하지 않습니다. 다시 확인하세요.",
          );
        }
      }
      if (lectureId) {
        const existingLectureId = await client.lectures.findUnique({
          where: { id: lectureId },
        });
        if (!existingLectureId) {
          throw new NotFoundException(
            "lectureId 가 유효하지 않습니다. 다시 확인하세요.",
          );
        }
      }

      //동적조건으로 바꾸자
      const where = {} as IWhere;
      if (subjectId) where.subjectId = subjectId;
      if (lectureId) where.lectureId = lectureId;

      const [result, totalCount] = await Promise.all([
        client.regularEvaluationSet.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip: (pageNum - 1) * take,
          take,
        }),
        client.regularEvaluationSet.count({
          where,
        }),
      ]);
      return {
        ok: true,
        message: `${totalCount || 0}건 검색완료 되었습니다.`,
        data: result || [],
        totalCount: totalCount || 0,
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
