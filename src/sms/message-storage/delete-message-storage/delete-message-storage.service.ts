import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class DeleteMessageStorageService {
  constructor(private readonly client: PrismaService) {}
  async deleteMessageStorageFunc(id: number) {
    try {
      const client = this.client;
      //exist
      const existingData = await client.messageStorage.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingData);
      await client.messageStorage.delete({
        where: {
          id,
        },
      });
      // 데이터가 삭제되었는지 확인
      const checkDeleted = await client.messageStorage.findUnique({
        where: {
          id,
        },
      });

      if (checkDeleted) {
        throw new Error("데이터가 삭제되지 않았습니다.");
      }
      return {
        ok: true,
        message: "데이터가 정상적으로 삭제 되었습니다.",
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
