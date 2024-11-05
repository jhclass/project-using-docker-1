import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeeStudentStateService {
  constructor(private readonly client: PrismaService) {}
  async seeStudentStateFunc(context: any, page: number, limit?: number) {
    try {
      const { user } = context.req;
      const ITEMS_PER_PAGE = limit === null ? 15 : limit;
      const totalCount = await this.client.studentState.count({
        where: {
          AND: [
            { branchId: user?.branchId },
            {
              progress: {
                not: 110,
              },
            },
            {
              progress: {
                not: 60,
              },
            },
          ],
        },
      });
      //console.log(totalCount);
      const seeStutentStateOk = await this.client.studentState.findMany({
        where: {
          AND: [
            { branchId: user?.branchId },
            {
              progress: {
                not: 110,
              },
            },
            {
              progress: {
                not: 60,
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        take: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
      });

      //console.log(seeStutentStateOk);
      return {
        ok: true,
        message: `정상적으로 조회 완료 되었습니다.`,
        totalCount,
        studentState: seeStutentStateOk,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요. ${error.message}`,
      };
    }
  }
}
