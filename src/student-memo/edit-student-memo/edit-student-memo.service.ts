import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditStudentMemoService {
  constructor(private readonly client: PrismaService) {}
  async editStudentMemoFunc(
    context: any,
    id: number,
    content: string,
    lastModifiedTime: string,
  ) {
    try {
      if (!id || !lastModifiedTime) {
        throw new Error("id 와 lastModifiedTime 은 필수값 입니다.");
      }
      const { user } = context.req;
      const client = this.client;
      const existing = await client.studentMemo.findUnique({
        where: {
          id,
        },
      });
      console.log(existing);
      if (!existing) {
        return {
          ok: false,
          message: "데이터가 존재하지 않습니다.",
        };
      } else if (existing.manageUserId !== user?.id) {
        return {
          ok: false,
          message: "해당메모 작성자가 아닙니다. 수정할 수 없습니다.",
        };
      }

      await client.studentMemo.update({
        where: {
          id,
        },
        data: {
          content,
          lastModifiedTime,
        },
      });

      return {
        ok: true,
        message: "수정완료 되었습니다.",
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
