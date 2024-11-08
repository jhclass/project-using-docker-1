import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateSubjectService {
  constructor(private readonly client: PrismaService) {}
  async createSubjectFunc(
    context: any,
    subDiv: string,
    subjectName: string,
    fee: number,
    round: number,
    startDate?: string,
    endDate?: string,
    roomNum?: string,
    exposure?: boolean,
    totalTime?: number,
    teacherName?: string,
    subjectCode?: string,
    expiresDateStart?: string,
    expiresDateEnd?: string,
  ) {
    try {
      const { user } = context.req;
      const createSubjectData = await this.client.subject.create({
        data: {
          subDiv,
          subjectName,
          fee,
          startDate,
          endDate,
          roomNum,
          totalTime,
          teacherName,
          exposure,
          subjectCode,
          expiresDateStart,
          expiresDateEnd,
          round,
          branchId: user?.branchId,
        },
      });
      //console.log(createSubjectData);
      if (!createSubjectData) {
        throw new Error("데이터가 정상적으로 생성되지 않았습니다.");
      }
      return {
        ok: true,
        message: `${subjectName}이(가) 등록되었습니다.`,
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
