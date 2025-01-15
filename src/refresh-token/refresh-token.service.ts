import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import * as jwt from "jsonwebtoken";
interface IDecoded {
  mUserId: string;
}
@Injectable()
export class RefreshTokenService {
  constructor(private readonly client: PrismaService) {}
  async refreshTokenFunc(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new BadRequestException(
          `freshToken 이 없습니다. 다시 확인하세요.`,
        );
      }
      // 기존 토큰 검증
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY,
      ) as IDecoded;

      const existingUserId = await this.client.manageUser.findFirst({
        where: { mUserId: decoded.mUserId },
      });
      if (!existingUserId) {
        throw new UnauthorizedException(
          `freshToken이 잘못되었습니다. 다시 확인하세요.`,
        );
      }
      //새 토큰 발급
      const newAccessToken = jwt.sign(
        { mUserId: decoded.mUserId },
        process.env.SECRET_KEY,
        {
          expiresIn: "12h",
        },
      );

      return {
        ok: true,
        newAccessToken,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        error: `Error:${error.message}`,
      };
    }
  }
}
