import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class DeletePreInspectionService {
  constructor(private readonly client: PrismaService) {}
  async deletePreInspectionFunc(id: number) {
    try {
      const client = this.client;
      //checking id
      const existingId = await client.preInspection.findUnique({
        where: {
          id,
        },
      });

      validateIdExists(existingId);

      await client.preInspection.delete({
        where: { id },
      });
      return {
        ok: true,
        message: "정상적으로 삭제 완료 되었습니다.",
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
