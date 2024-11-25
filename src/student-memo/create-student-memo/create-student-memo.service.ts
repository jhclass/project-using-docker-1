import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateStudentMemoService {
  constructor(private readonly client: PrismaService) {}
  async createStudentMemoFunc(context, content, studentId) {
    try {
      const { user } = context.req;
      const client = this.client;
      await client.studentMemo.create({
        data: {
          content,
          student: {
            connect: {
              id: studentId,
            },
          },
          manageUser: {
            connect: {
              id: user?.id,
            },
          },
          Branch: {
            connect: {
              id: user?.branchId,
            },
          },
        },
      });
      return {
        ok: true,
        message: "메모가 정상적으로 생성 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message:
          "에러발생! 메세지 생성 실패하였습니다. 에러메세지를 확인하여주세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
