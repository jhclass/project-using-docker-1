import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateWorkLogsService {
  constructor(private readonly client: PrismaService) {}
  async createWorkLogsFunc(
    context: any,
    lecturesId: number,
    workLogsDate: string,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      //동일한게 있는가?
      //하루 한개만 생성할 수 있다.
      const existingWorkLogsData = await client.workLogs.findFirst({
        where: {
          lecturesId,
          workLogsDate,
        },
      });
      if (existingWorkLogsData) {
        throw new Error("오늘 업무일지는 이미 생성되었습니다.");
      }
      const newWorkLogs = await client.workLogs.create({
        data: {
          lecturesId,
          workLogsDate,
          branchId: user?.branchId,
        },
      });
      if (!newWorkLogs) {
        throw new Error(
          "데이터가 제대로 생성되지 않았습니다. 다시 확인하세요.",
        );
      }
      return {
        ok: true,
        message: "데이터가 정상적으로 생성되었습니다.",
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
