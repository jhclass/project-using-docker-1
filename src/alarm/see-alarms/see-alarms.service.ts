import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeeAlarmsService {
  constructor(private readonly client: PrismaService) {}
  async seeAlarmsFunc(context: any, limit: number, page: number) {
    try {
      const { user } = context.req;
      const currentPage = page || 1;
      const take = limit || 30;
      const dataOk = await this.client.alarm.findMany({
        where: {
          branchId: user?.branchId,
          personalTarget: {
            has: user?.id,
          },
        },
        skip: (currentPage - 1) * take,
        take,
        orderBy: {
          createdAt: "desc",
        },
      });
      const totalCount = await this.client.alarm.count({
        where: {
          branchId: user?.branchId,
          personalTarget: {
            has: user?.id,
          },
        },
      });
      if (totalCount === 0) {
        return {
          ok: true,
          message: "알람이 없습니다.",
          totalCount: 0,
          data: [],
        };
      }
      return {
        ok: true,
        message: `총 ${totalCount} 개의 알람이 검색되었습니다.}`,
        data: dataOk,
        totalCount: totalCount,
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
