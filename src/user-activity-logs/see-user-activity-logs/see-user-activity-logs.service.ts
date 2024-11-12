import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeeUserActivityLogsService {
  constructor(private readonly client: PrismaService) {}
  async seeUserActivityLogsFunc(context: any) {
    try {
      const { user } = context.req;
      const datas = await this.client.userActivityLogs.findMany({
        where: {
          branchId: user?.branchId,
        },
      });
      const totalCount = await this.client.userActivityLogs.count({
        where: {
          branchId: user?.branchId,
        },
      });
      return {
        ok: true,
        message: "정상적으로 조회 완료 되었습니다.",
        data: datas || [],
        totalCount: totalCount || 0,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
      };
    }
  }
}
