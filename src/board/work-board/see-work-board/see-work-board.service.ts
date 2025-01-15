import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISeeConditions {
  branchId: number;
}

@Injectable()
export class SeeWorkBoardService {
  constructor(private readonly client: PrismaService) {}
  async seeWorkBoardFunc(context: any, page?: number, limit?: number) {
    try {
      const client = this.client;
      const { user } = context.req;
      page = page || 1;
      limit = limit || 10;
      const seeConditions = {
        branchId: user.branchId,
      } as ISeeConditions;
      const [data, totalCount] = await Promise.all([
        client.workBoard.findMany({
          where: seeConditions,
          skip: (page - 1) * limit,
          take: limit,
        }),
        client.workBoard.count({
          where: seeConditions,
        }),
      ]);
      return {
        ok: true,
        message: "정상적으로 조회완료 되었습니다.",
        data: data || [],
        totalCount: totalCount || 0,
      };
    } catch (error) {
      console.error(error.message);

      return {
        ok: true,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error}`,
      };
    }
  }
}
