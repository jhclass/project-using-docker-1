import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  id: number;
  branchId: number;
  receiver: {
    contains: string;
  };
  manageUserId: number;
  createdAt: {
    gte: string;
    lte: string;
  };
  saveType: string;
}
@Injectable()
export class SearchSmsService {
  constructor(private readonly client: PrismaService) {}
  async searchSmsFunc(
    context: any,
    id?: number,
    branchId?: number,
    receiver?: string,
    manageUserId?: number,
    period?: string[],
    page?: number,
    limit?: number,
    saveType?: string,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      const pageNum = page || 1;
      const take = limit || 10;
      const branchId = user?.branchId;
      const searchConditions = {} as ISearchConditions;
      if (id) {
        searchConditions.id = id;
      }
      if (branchId) {
        searchConditions.branchId = branchId;
      }
      if (receiver) {
        searchConditions.receiver = {
          contains: receiver,
        };
      }
      if (manageUserId) {
        searchConditions.manageUserId = manageUserId;
      }
      if (period) {
        searchConditions.createdAt = {
          gte: period[0],
          lte: period[1],
        };
      }
      if (saveType) {
        saveType = saveType.trim();
        searchConditions.saveType = saveType;
      }

      const [searchSmsData, totalCount] = await Promise.all([
        client.sms.findMany({
          where: searchConditions,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            Branch: true,
            manageUser: true,
          },
          skip: (pageNum - 1) * take,
          take,
        }),
        client.sms.count({
          where: searchConditions,
        }),
      ]);
      if (searchSmsData.length === 0) {
        return {
          ok: true,
          message: "데이터가 존재하지 않습니다.",
        };
      }
      return {
        ok: true,
        message: `총 ${totalCount} 개의 데이터가 검색되었습니다.`,
        data: searchSmsData,
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
