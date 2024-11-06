import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditConsultationMemoService {
  constructor(private readonly client: PrismaService) {}
  async editConsultationMemoFunc(
    context: any,
    id: number,
    content: string,
    lastModifiedTime?: string,
  ) {
    try {
      const { user } = context.req;
      if (!user) {
        throw new Error(
          `현재 user 가 존재하지 않습니다. token 상태를 확인하세요.`,
        );
      }
      if (!id || !lastModifiedTime || !content) {
        throw new Error("id,lastModifiedTime,content 은(는) 필수값 입니다.");
      }
      //기존에 memo가 있는지 검색
      const existence = await this.client.consultationMemo.findFirst({
        where: {
          id,
        },
      });
      if (!existence) {
        throw new Error(`해당 항목을 찾을 수 없습니다.`);
      }

      await this.client.consultationMemo.update({
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
        message: "데이터가 정상적으로 수정 완료 되었습니다.",
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
