import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class EditStudentConsultationService {
  constructor(private readonly client: PrismaService) {}
  async editStudentConsultationFunc(
    context: any,
    id: number,
    lastModifiedTime: string,
    typeOfConsultation: string,
    dateOfConsultation: string,
    detailsOfConsultation: string,
  ) {
    try {
      //
      if (!id || !lastModifiedTime) {
        throw new BadRequestException(
          "id 와 lastModifiedTime 은 필수값 입니다.",
        );
      }

      const client = this.client;
      const { user } = context.req;
      const existingId = await client.studentConsultation.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
      await client.studentConsultation.update({
        where: {
          id,
        },
        data: {
          typeOfConsultation,
          dateOfConsultation,
          detailsOfConsultation,
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
      console.error(error);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
