import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditBusinessAccountReqService {
  constructor(private readonly client: PrismaService) {}
  async editBusinessAccountReqFunc(
    id: number,
    creationComplete: string,
    rejection?: string,
  ) {
    try {
      if (!id || !creationComplete) {
        throw new BadRequestException(
          "id,creationComplete 는 필수 입력 값 입니다.",
        );
      }

      const client = this.client;
      await client.businessAccountReq.update({
        where: {
          id,
        },
        data: {
          creationComplete,
          rejection,
        },
      });
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error}`,
      };
    }
  }
}
