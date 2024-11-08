import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

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
        throw new Error("id 와 lastModifiedTime 은 필수값 입니다.");
      }
      const existingId = await this.client.subject.findUnique({
        where: {
          id,
        },
      });
      if (!existingId) {
        throw new Error("id 가 존재하지 않습니다. 다시 확인 하세요.");
      }

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
