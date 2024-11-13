import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CheckingIpRecordService {
  constructor(private readonly client: PrismaService) {}
  async checkingIpRecordFunc(context: any, ipRecord: string, today: string[]) {
    try {
      const { user } = context.req;
      if (!ipRecord) {
        throw new Error("ipRecord 는 필수값 입니다.");
      }
      const ipCount = await this.client.ipRecord.count({
        where: {
          ipRecord,
          createdAt: {
            gte: today[0],
            lte: today[1],
          },
          branchId: user?.branchId,
        },
      });
      if (ipCount >= 10) {
        throw new Error(
          "하루에 등록할 수 있는 게시글의 개수를 초과하였습니다.",
        );
      }
      return {
        ok: true,
        message: `ipRecord 에서 ${ipCount}/10 개의 게시글이 작성되었습니다. 동일 ip 로 하루에 10개 이상의 글은 작성이 안됩니다. `,
      };
    } catch (error) {
      console.error(error.message);
    }
  }
}
