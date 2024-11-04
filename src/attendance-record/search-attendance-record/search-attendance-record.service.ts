import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SearchAttendanceRecordService {
  constructor(private readonly client: PrismaService) {}
  async searchAttendanceRecordFunc(
    context: any,
    id?: number,
    period?: string[],
    mUserId?: string,
    mUsername?: string,
    page?: number,
    limit?: number,
  ) {
    try {
      const { user } = context.req;

      const branchId = user?.branchId;
      const pageNum = page ?? 1;
      const take = limit ?? 10;
      const searchConditions = { ...branchId };
      if (id) {
        searchConditions.id = id;
      }
      if (period) {
        searchConditions.clockIn = {
          gte: period[0],
          lte: period[1],
        };
      }
      if (mUserId || mUsername) {
        searchConditions.ManageUser = {
          is: {
            ...(mUserId && { mUserId }),
            ...(mUsername && { mUsername }),
          },
        };
      }
      const result = await this.client.attendanceRecord.findMany({
        where: searchConditions,
        skip: (pageNum - 1) * take,
        include: {
          ManageUser: true,
        },
        take,
        orderBy: {
          createdAt: "desc",
        },
      });
      const totalCount = await this.client.attendanceRecord.count({
        where: searchConditions,
      });
      const messages =
        totalCount === 0
          ? `정상적으로 검색완료 되었지만 일치하는 내용이 없습니다.`
          : `정상적으로 검색 완료 되었습니다.`;
      return {
        ok: true,
        message: messages,
        result: result || [],
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
