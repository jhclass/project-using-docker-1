import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeeMessageStorageService {
  constructor(private readonly client: PrismaService) {}
  async seeMessageStorageFunc(
    context: any,
    saveType: string,
    page?: number,
    limit?: number,
  ) {
    try {
      if (!saveType) {
        throw new Error("saveType 은 반드시 존재해야합니다.");
      }
      const client = this.client;
      const { user } = context.req;
      saveType = saveType.trim();
      const pageNum = page || 1;
      const take = limit || 12;
      if (saveType === "개인") {
        const dataOk = await client.messageStorage.findMany({
          where: {
            saveType,
            manageUserId: user?.id,
            branchId: user?.branchId,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: (pageNum - 1) * take,
          take,
        });
        const totalCount = await client.messageStorage.count({
          where: {
            saveType,
            manageUserId: user?.id,
            branchId: user?.branchId,
          },
        });
        if (!dataOk) {
          throw new Error("데이터가 존재하지 않습니다.");
        }

        return {
          ok: true,
          message: `총 ${totalCount || 0} 개의 데이터가 검색되었습니다.`,
          data: dataOk,
          totalCount: totalCount || 0,
        };
      } else if ((saveType = "공통")) {
        const dataOk = await client.messageStorage.findMany({
          where: {
            saveType,
            branchId: user?.branchId,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: (pageNum - 1) * take,
          take,
        });
        const totalCount = await client.messageStorage.count({
          where: {
            branchId: user?.branchId,
            saveType,
          },
        });
        if (!dataOk) {
          throw new Error("데이터가 존재하지 않습니다.");
        }

        return {
          ok: true,
          message: `총 ${totalCount || 0} 개의 데이터가 검색되었습니다.`,
          data: dataOk,
          totalCount: totalCount || 0,
        };
      }
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하여주세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
