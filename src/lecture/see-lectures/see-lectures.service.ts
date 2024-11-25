import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeeLecturesService {
  constructor(private readonly client: PrismaService) {}
  async seeLecturesFunc(context: any, page?: number, limit?: number) {
    try {
      const { user } = context.req;
      const client = this.client;
      const pageNum = page || 1;
      const take = limit || 10;

      const [data, totalCount] = await Promise.all([
        client.lectures.findMany({
          where: {
            branchId: user?.branchId,
          },
          skip: (pageNum - 1) * take,
          take,
          include: {
            subject: {
              include: {
                StudentPayment: true,
              },
            },
            teachers: true,
          },
          orderBy: {
            lecturePeriodStart: "desc",
          },
        }),
        client.lectures.count({
          where: {
            branchId: user?.branchId,
          },
        }),
      ]);

      return {
        ok: true,
        message: `${totalCount || 0} 건의 데이터가 조회되었습니다.`,
        data,
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
