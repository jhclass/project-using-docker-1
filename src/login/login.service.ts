import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
@Injectable()
export class LoginService {
  constructor(private client: PrismaService) {}
  async loginFunc(mUserId: string, mPassword: string) {
    try {
      if (!mUserId || !mPassword) {
        throw new Error("아이디 와 비밀번호는 반드시 입력되어야 합니다.");
      }
      const existingId = await this.client.manageUser.findUnique({
        where: {
          mUserId,
        },
      });
      if (!existingId) {
        throw new Error(
          "아이디가 존재하지 않습니다. 아이디/패스워드를 다시 확인하세요.",
        );
      }
      const passwordOk = await bcrypt.compare(mPassword, existingId.mPassword);
      if (!passwordOk) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      const token = jwt.sign(
        { mUserId: existingId.mUserId },
        process.env.SECRET_KEY,
        { expiresIn: "12h" },
      );
      const refreshToken = jwt.sign(
        { mUserId: existingId.mUserId },
        process.env.REFRESH_KEY,
        {
          expiresIn: "12h",
        },
      );

      return {
        ok: true,
        message: "로그인 완료 되었습니다.",
        token,
        refreshToken,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: `Error: 에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
