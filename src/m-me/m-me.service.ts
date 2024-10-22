import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class MMeService {
  constructor(private readonly client: PrismaService) {}
  async mMeFunc(context: any) {
    try {
      const { user } = context.req;
      //console.log(user);
      const mUser = await this.client.manageUser.findUnique({
        where: {
          id: user.id,
        },
        include: {
          Stamp: true,
        },
      });
      if (!mUser) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }
      return mUser;
    } catch (error) {
      console.error(error.message);
    }
  }
  async isMmeFunc(context: any) {
    try {
      const { user } = context.req;
      //console.log(user);
      const existingId = await this.client.manageUser.findUnique({
        where: {
          id: user.id,
        },
      });
      if (!existingId) {
        throw new Error(`본인이 아닙니다.`);
      }
      return {
        ok: true,
        message: "본인 입니다.",
      };
      //console.log(Ok.id, context.loggedInManager.id);
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
