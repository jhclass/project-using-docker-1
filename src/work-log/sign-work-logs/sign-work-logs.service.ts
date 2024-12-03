import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SignWorkLogsService {
  constructor(private readonly client: PrismaService) {}
  private async updateWorkLogAndReturnResult(
    id: number,
    rank: number,
    paymentKey: string,
    stampUrl: string,
    lastModifiedTime: string,
  ) {
    await this.client.workLogs.update({
      where: {
        id,
      },
      data: {
        [paymentKey]: stampUrl,
        lastModifiedTime,
      },
    });
    return {
      ok: true,
      message: `${rank} 직인완료`,
      stampUrl,
    };
  }
  async signWorkLogsFunc(context: any, id: number, lastModifiedTime?: string) {
    try {
      if (!id || !lastModifiedTime) {
        throw new Error("id 와 lastModifiedTime 은 필수값 입니다.");
      }
      const { user } = context.req;
      const client = this.client;
      //console.log(context.loggedInManager.id, "뭐야");
      const checkGrade = await client.manageUser.findUnique({
        where: {
          id: user?.id,
        },
        include: {
          Stamp: true,
        },
      });
      if (!checkGrade) {
        throw new Error("당신은 HMS 사용자가 아닙니다.");
      }
      console.log(checkGrade);

      const rankToPaymentKey = {
        99: "paymentOne",
        9: "paymentTwo",
        0: "paymentThree",
        1: "paymentThree",
        2: "paymentThree",
      };
      const paymentKey = rankToPaymentKey[checkGrade.mGrade];
      if (paymentKey && checkGrade.Stamp.length > 0) {
        return this.updateWorkLogAndReturnResult(
          id,
          checkGrade.mGrade,
          paymentKey,
          checkGrade.Stamp[0].imageUrl,
          lastModifiedTime,
        );
      } else {
        return {
          ok: false,
          message:
            "권한이 없습니다.(mGrade확인 또는 Stamp 생성여부를 확인하세요.)",
        };
      }
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
