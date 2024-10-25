import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class EditPermissionsGrantedService {
  constructor(private readonly client: PrismaService) {}
  async editPermissionsGrantedFunc(
    context: any,
    lastModifiedTime: string,
    id: number,
    permissionName: string,
    topic: string,
    manageUserIdsToConnect?: number[],
    manageUserIdsToDisconnect?: number[],
    smsPermitted?: string,
    readOnly?: string,
    allPermitted?: string,
  ) {
    try {
      const { user } = context.req;
      const { branchId } = user.branchId;
      const existingId = await this.client.permissionsGranted.findUnique({
        where: { id, branchId: branchId },
      });
      //existingId 검증
      validateIdExists(existingId);

      manageUserIdsToConnect = manageUserIdsToConnect || [];
      manageUserIdsToDisconnect = manageUserIdsToDisconnect || [];
      await this.client.permissionsGranted.update({
        where: { id },
        data: {
          permissionName,
          topic,
          smsPermitted,
          readOnly,
          allPermitted,
          ManageUser: {
            disconnect: manageUserIdsToDisconnect.map((id) => ({
              id,
            })),
            connect: manageUserIdsToConnect.map((id) => ({
              id,
            })),
          },
          lastModifiedTime,
        },
      });
      return { ok: true, message: `정상적으로 수정 완료 되었습니다.` };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
