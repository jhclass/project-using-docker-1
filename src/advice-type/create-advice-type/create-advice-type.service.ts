import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateAdviceTypeService {
  constructor(private readonly client: PrismaService) {}
  async createAdviceTypeFunc(
    context: any,
    type: string,
    indexNum: number,
    category?: string,
    onOff?: string,
    defaultValue?: string,
  ) {
    try {
      const { user } = context.req;
      if (onOff === "N") {
        throw new Error(`onOff 상태는 무조건 "Y" 로 지정해야합니다.`);
      }
      const compareAT = await this.client.adviceType.findFirst({
        where: {
          type,
          category,
          onOff: onOff,
          branchId: user?.branchId,
        },
      });
      if (compareAT !== null) {
        throw new Error(`중복되는 분야 입니다.`);
      }
      await this.client.adviceType.create({
        data: {
          type,
          indexNum,
          category,
          onOff,
          defaultValue,
          branchId: user?.branchId,
        },
      });
      return {
        ok: true,
        message: `정상적으로 등록 완료 되었습니다.`,
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
