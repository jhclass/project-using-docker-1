import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  id?: number;
  permissionName?: string;
  topic?: string;
  ManageUser: {
    some: {
      id: number;
    };
  };
}

@Injectable()
export class SearchPermissionsGrantedService {
  constructor(private readonly client: PrismaService) {}
  async searchPermissionsGrantedFunc(
    context: any,
    id?: number,
    permissionName?: string,
    topic?: string,
    manageUserId?: number,
  ) {
    try {
      const { user } = context.req;
      const { branchId } = user;
      const searchConditions = { ...branchId } as ISearchConditions;
      if (id) {
        searchConditions.id = id;
      }
      if (permissionName) {
        searchConditions.permissionName = permissionName;
      }
      if (topic) {
        searchConditions.topic = topic;
      }
      if (manageUserId) {
        searchConditions.ManageUser = {
          some: {
            id: manageUserId,
          },
        };
      }
      const result = await this.client.permissionsGranted.findMany({
        where: searchConditions,
        orderBy: [{ topic: "asc" }, { createdAt: "desc" }],
      });

      const totalCount = await this.client.permissionsGranted.count({
        where: searchConditions,
      });
      return {
        ok: true,
        message: `정삭적으로 검색 완료 되었습니다.`,
        data: result || [],
        totalCount: totalCount || 0,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
