import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeeAdviceTypeService {
  constructor(private client: PrismaService) {}
  async seeAdviceFunc(
    context: any,
    limit?: number,
    page?: number,
    category?: string,
  ) {
    try {
      const { user } = context.req;
      const take = limit || 30;
      const pageNum = page || 1;
      const [adviceType, totalCount] = await Promise.all([
        this.client.adviceType.findMany({
          where: {
            category,
            onOff: "Y",
            branchId: user?.branchId,
          },
          include: {
            Branch: true,
          },
          skip: (pageNum - 1) * take,
          take,
          orderBy: {
            indexNum: "asc",
          },
        }),
        this.client.adviceType.count({
          where: {
            category,
            onOff: "Y",
            branchId: user?.branchId,
          },
        }),
      ]);
      return {
        ok: true,
        message: `정상적으로 조회 완료 되었습니다.`,
        adviceType: adviceType || [],
        totalCount: totalCount || 0,
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
