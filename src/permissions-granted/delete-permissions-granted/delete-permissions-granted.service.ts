import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class DeletePermissionsGrantedService {
  constructor(private readonly client: PrismaService) {}
  async deletePErmissionsFunc(id: number) {
    try {
      const existingId = await this.client.permissionsGranted.findUnique({
        where: { id },
      });
      validateIdExists(existingId);
      await this.client.permissionsGranted.delete({
        where: { id },
      });
      return {
        ok: true,
        message: `정상적으로 삭제 완료 되었습니다.`,
      };
    } catch ({ message }) {
      console.error(message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${message}`,
      };
    }
  }
}
