import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  branchId: number;
  id: number;
  subjectId: number;
  temporaryName: {
    contains: string;
    mode: "insensitive" | "default";
  };
  teachers: {
    some: {
      id: number;
    };
  };

  AND?: Array<{
    lecturePeriodStart?: { gte?: string };
    lecturePeriodEnd?: { lte?: string };
  }>;
  OR?: Array<{
    lecturePeriodStart?: { gte?: string; lte?: string };
    lecturePeriodEnd?: { gte?: string; lte?: string };
  }>;

  lecturePeriodStart: { gte: string; lte: string };
  lecturePeriodEnd: { gte: string; lte: string };
}
@Injectable()
export class SearchLecturesService {
  constructor(private readonly client: PrismaService) {}
  async searchLecturesFunc(
    context: any,
    id?: number,
    periodStart?: string,
    periodEnd?: string,
    temporaryName?: string,
    subjectId?: number,
    teacherId?: number,
    limit?: number,
    page?: number,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      page = page || 1;
      const take = limit || 10;
      const branchId = user?.branchId;
      //강의는 기간검색
      const searchCondition = {} as ISearchConditions;
      if (branchId) {
        searchCondition.branchId = branchId;
      }
      if (id) {
        searchCondition.id = id;
      }
      if (subjectId) {
        searchCondition.subjectId = subjectId;
      }
      if (temporaryName) {
        searchCondition.temporaryName = {
          contains: temporaryName,
          mode: "insensitive",
        };
      }
      if (teacherId) {
        searchCondition.teachers = {
          some: {
            id: teacherId,
          },
        };
      }

      if (periodStart && periodEnd) {
        searchCondition.AND = [
          {
            lecturePeriodStart: { gte: periodStart },
          },
          {
            lecturePeriodEnd: { lte: periodEnd },
          },
        ];
      } else if (periodStart) {
        searchCondition.OR = [
          {
            lecturePeriodStart: { gte: periodStart },
          },
          {
            lecturePeriodEnd: { gte: periodStart },
          },
        ];
      } else if (periodEnd) {
        searchCondition.OR = [
          {
            lecturePeriodStart: { lte: periodEnd },
          },
          {
            lecturePeriodEnd: { lte: periodEnd },
          },
        ];
      }

      const [dataOk, totalCount] = await Promise.all([
        client.lectures.findMany({
          where: searchCondition,
          include: {
            teachers: true,
            WorkLogs: true,
            subject: {
              include: {
                StudentPayment: {
                  where: {
                    lectureAssignment: "배정",
                  },
                },
              },
            },
          },
          skip: (page - 1) * take,
          take,
          orderBy: {
            lecturePeriodStart: "desc", //강의시작일
          },
        }),
        client.lectures.count({
          where: searchCondition,
        }),
      ]);

      return {
        ok: true,
        message: `${totalCount} 건의 데이터가 검색되었습니다.`,
        data: dataOk || [],
        totalCount: totalCount || 0,
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
