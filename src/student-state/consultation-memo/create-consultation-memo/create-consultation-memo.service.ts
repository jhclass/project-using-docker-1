import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateConsultationMemoService {
  constructor(private readonly client: PrismaService) {}
  async createConsultationMemoFunc(
    context: any,
    content: string,
    studentStateId: number,
  ) {
    try {
      const { user } = context.req;
      const createMemo = await this.client.consultationMemo.create({
        data: {
          manageUser: {
            connect: {
              mUserId: user?.mUserId,
            },
          },
          content,
          studentState: {
            connect: {
              id: studentStateId,
            },
          },
          Branch: {
            connect: {
              id: user?.branchId,
            },
          },
        },
      });

      if (!createMemo) {
        throw new InternalServerErrorException("메모를 생성할 수 없습니다.");
      }
      return {
        ok: true,
        message: `${user?.mUsername} 님이 ${content} 를 남겼습니다.`,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: true,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
