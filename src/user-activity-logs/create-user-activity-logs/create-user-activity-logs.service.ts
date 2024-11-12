import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateUserActivityLogsService {
  constructor(private readonly client: PrismaService) {}
  async createUserActivityLogsFunc(
    context: any,
    eventName: string,
    description?: string,
  ) {
    try {
      const { user } = context.req;

      await this.client.userActivityLogs.create({
        data: {
          userId: user?.mUserId,
          eventName,
          description: description || "no Data",
          branchId: user?.branchId,
        },
      });
      return {
        ok: true,
        message: "정상적으로 등록완료 되었습니다.",
      };
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
