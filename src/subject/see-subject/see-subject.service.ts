import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeeSubjectService {
  constructor(private readonly client: PrismaService) {}
  async seeSubjectFunc(context: any, page?: number, limit?: number) {
    try {
      const { user } = context.req;
      const skip = (page - 1) * limit;
      const getSubject = await this.client.subject.findMany({
        where: {
          branchId: user?.branchId,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      });
      //console.log(getSubject)
      //totalCount
      const totalCount = await this.client.subject.count({
        where: {
          branchId: user?.branchId,
        },
      });
      return {
        ok: true,
        message: "정상적으로 조회 완료 되었습니다.",
        totalCount: totalCount || 0,
        subject: getSubject || [],
      };
    } catch (error) {
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
