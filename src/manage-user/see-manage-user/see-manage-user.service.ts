import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { SeeManageUserResult } from "../entity/manageUser.entity";

@Injectable()
export class SeeManageUserService {
  constructor(private readonly client: PrismaService) {}
  async seeManageUserFunc(
    context: any,
    limit?: number,
    page?: number,
    resign?: string,
  ): Promise<SeeManageUserResult> {
    try {
      const { user } = context.req;
      const take = limit ?? 10;
      const pageNum = page ?? 1;
      const [result, totalCount] = await Promise.all([
        this.client.manageUser.findMany({
          where: {
            resign,
            branchId: user.branchId,
          },
          skip: (pageNum - 1) * take,
          take,
        }),
        this.client.manageUser.count(),
      ]);
      return {
        ok: true,
        message: `정상적으로 조회 완료 되었습니다.`,
        data: result || [],
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
