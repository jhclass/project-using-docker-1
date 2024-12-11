import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Injectable()
export class CreateMessageStorageService {
  constructor(private readonly client: PrismaService) {}
  async createMessageStorageFunc(
    context: any,
    message?: string,
    saveType?: string,
  ): Promise<CommonResponse> {
    try {
      const client = this.client;
      const { user } = context.req;
      const messageOk = await client.messageStorage.create({
        data: {
          message,
          saveType,
          manageUserId: user?.id,
          branchId: user?.branchId,
        },
      });
      if (!messageOk) {
        throw new InternalServerErrorException(
          "메세지내용이 저장되지 않았습니다.",
        );
      }
      return {
        ok: true,
        message: `정상적으로 ${saveType} 보관함에 저장 되었습니다.`,
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
