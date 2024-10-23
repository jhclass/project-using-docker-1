import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreatePermissionsGrantedService {
  constructor(private readonly client: PrismaService) {}
  async createPermissionsGrantedFunc(
    context: any,
    permissionName: string,
    topic: string,
    manageUserIds: number[],
    smsPermitted: string,
    readOnly: string,
    allPermitted: string,
  ) {
    try {
      const { user } = context.req;
      if (!permissionName || !topic) {
        throw new Error("필수값을 확인하세요");
      }
      if (!Array.isArray(manageUserIds)) {
        throw new Error(
          `manageUserIds 값을 확인하세요. type 은 배열이어야 하고 값은 1개 이상 들어있어야 합니다.`,
        );
      }
      const existingIds = await this.client.manageUser.findMany({
        where: {
          id: {
            in: manageUserIds,
          },
        },
      });
      console.log("existingIds", existingIds);
      const foundIds = existingIds.map((user) => user.id);
      const missingIds = manageUserIds.filter(
        (id: number) => !foundIds.includes(id), //역순으로 변경해서 포함되지 않는 것만 추출
      );
      //console.log("foundIds", foundIds);
      //console.log("missingIds", missingIds.length);
      if (missingIds.length > 0) {
        throw new Error(
          `다음 ID는 존재하지 않습니다: ${missingIds.join(", ")}`,
        );
      }

      await this.client.permissionsGranted.create({
        data: {
          permissionName,
          topic,
          ManageUser: {
            connect: manageUserIds.map((id) => ({
              id,
            })),
          },
          smsPermitted,
          readOnly,
          allPermitted,
          branchId: user?.branchId,
        },
      });
      return {
        ok: true,
        message: `정상적으로 등록 완료 되었습니다.`,
      };
    } catch (error) {
      console.error(console.error);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
