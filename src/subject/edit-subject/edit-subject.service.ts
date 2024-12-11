import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class EditSubjectService {
  constructor(private readonly client: PrismaService) {}
  async editSubjectFunc(
    id: number,
    subDiv: string,
    subjectName: string,
    fee: number,
    startDate?: string,
    endDate?: string,
    roomNum?: string,
    exposure?: boolean,
    totalTime?: number,
    teacherName?: string,
    subjectCode?: string,
    expiresDateStart?: string,
    expiresDateEnd?: string,
    mGrade?: number,
    round?: number,
    lastModifiedTime?: string,
  ) {
    try {
      if (!id || !lastModifiedTime) {
        throw new BadRequestException(
          "id 와 lastModifiedTime 은 필수값 입니다.",
        );
      }
      const existingId = await this.client.subject.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);

      await this.client.subject.update({
        where: {
          id,
        },
        data: {
          subDiv,
          subjectName,
          fee,
          startDate,
          endDate,
          roomNum,
          exposure,
          totalTime,
          teacherName,
          subjectCode,
          expiresDateStart,
          expiresDateEnd,
          round,
          lastModifiedTime,
        },
      });

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
