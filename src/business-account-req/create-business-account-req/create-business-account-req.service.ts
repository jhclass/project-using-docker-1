import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { isArray } from "class-validator";

@Injectable()
export class CreateBusinessAccountReqService {
  constructor(private readonly client: PrismaService) {}
  async createBuninessAccountReqFunc(
    companyName: string,
    phoneNum: string,
    validate: string,
    email: string,
    agree: string,
    filePath?: string[],
  ) {
    try {
      //
      if (!companyName || !phoneNum || !validate || !email || !agree) {
        throw new BadRequestException(
          "입력되지 않은 데이터가 있습니다. 확인하여 주세요.",
        );
      }
      if (!isArray(filePath) || filePath.length < 1) {
        throw new BadRequestException(
          "filePath 는 배열이어야 하고, 반드시 입력되어야 합니다.",
        );
      }
      const client = this.client;
      await client.businessAccountReq.create({
        data: {
          companyName,
          phoneNum,
          validate,
          email,
          filePath,
          agree,
        },
      });
      return {
        ok: true,
        message: "정상적으로 생성 완료 되었습니다.",
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error}`,
      };
    }
  }
}
