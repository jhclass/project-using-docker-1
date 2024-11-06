import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class DeleteConsultationMemoService {
  constructor(private readonly client: PrismaService) {}
  async deleteConsultationMemoFunc(context: any, id: number) {
    try {
      const { user } = context.req;
      // 존재여부확인
      const existingData = await this.client.consultationMemo.findUnique({
        where: {
          id,
        },
        include: {
          //연관 테이블 의 mUsername만 가져옴
          manageUser: {
            select: {
              mUsername: true,
            },
          },
        },
      });
      //console.log(existingData);
      if (!existingData) {
        return {
          ok: false,
          error: "데이터가 존재하지 않습니다.",
        };
      }
      // 본인이 작성한건가요??(작성자만 삭제가능)
      else if (existingData?.manageUser?.mUsername !== user?.mUsername) {
        throw new Error(`작성자가 아닙니다.`);
      } else {
        //console.log("삭제합니다.");
        await this.client.consultationMemo.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
          message: `${existingData?.manageUser?.mUsername}님이 작성한 메모가 삭제되었습니다.`,
        };
      }
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
