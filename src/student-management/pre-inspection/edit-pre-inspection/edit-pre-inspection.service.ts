import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class EditPreInspectionService {
  constructor(private readonly client: PrismaService) {}
  async editPreInspectionFunc(
    context: any,
    id: number,
    lastModifiedTime: string,
    dateOfPreInspection: string,
    preScreenerType: string,
    preInspectionDetails: string,
    actionTaken: string,
  ) {
    try {
      if (!id || !lastModifiedTime) {
        throw new BadRequestException(
          "id 와 lastModifiedTime 은 필수값 입니다.",
        );
      }
      const client = this.client;
      const { user } = context.req;

      //checking id
      const existingId = await client.preInspection.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
      await client.preInspection.update({
        where: { id },
        data: {
          dateOfPreInspection,
          preScreenerType,
          preInspectionDetails,
          actionTaken,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
          lastModifiedTime,
        },
      });
      return {
        ok: true,
        message: "정상적으로 수정완료 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
