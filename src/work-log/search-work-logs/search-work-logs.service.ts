import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  id: number;
  workLogsDate: string;
  lecturesId: number;
  branchId: number;
}
@Injectable()
export class SearchWorkLogsService {
  constructor(private readonly client: PrismaService) {}
  async searchWorkLogsFunc(
    context: any,
    id?: number,
    workLogsDate?: string,
    lecturesId?: number,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      const branchId = user?.branchId;
      const searchConditions = {} as ISearchConditions;
      if (id) {
        searchConditions.id = id;
      }
      if (workLogsDate) {
        searchConditions.workLogsDate = workLogsDate;
      }
      if (lecturesId) {
        searchConditions.lecturesId = lecturesId;
      }
      if (branchId) {
        searchConditions.branchId = branchId;
      }
      const [searchWorkLogsData, totalCount] = await Promise.all([
        client.workLogs.findMany({
          where: searchConditions,
          include: {
            lectures: true,
            Branch: true,
          },
        }),
        client.workLogs.count({
          where: searchConditions,
        }),
      ]);
      return {
        ok: true,
        message: "정상적으로 검색완료 되었습니다.",
        totalCount: totalCount || 0,
        data: searchWorkLogsData || [],
      };
    } catch (error) {
      console.log(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
