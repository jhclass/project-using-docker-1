import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class ChangeOrderAtService {
  constructor(private readonly client: PrismaService) {}
  async changeOrderAtFunc(context: any, indexNums: number[], ids?: number[]) {
    try {
      const { user } = context.req;
      if (ids.length !== indexNums.length) {
        throw new BadRequestException(
          `id의 개수와 indexNum 의 개수가 맞지 않습니다. 다시 확인하세요.`,
        );
      }
      const existingATs = await this.client.adviceType.findMany({
        where: {
          id: {
            in: ids,
          },
          branchId: user?.branchId,
        },
      });
      if (existingATs.length !== ids.length) {
        throw new NotFoundException(
          `존재하지 않는 아이디가 포함되어 있습니다. 다시 확인하세요.`,
        );
      }
      const updates = ids.map((id, index) => {
        console.log(`Updating id: ${id}, with indexNum: ${indexNums[index]}`);
        return this.client.adviceType.update({
          where: { id },
          data: { indexNum: indexNums[index] },
        });
      });
      const transactionUpdates = await this.client.$transaction(updates);
      if (transactionUpdates.length !== ids.length) {
        throw new InternalServerErrorException(
          `일괄 업데이트 진행중에 문제가 발생하였습니다.`,
        );
      }
      return {
        ok: true,
        message: `정상적으로 수정 완료 되었습니다.`,
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
