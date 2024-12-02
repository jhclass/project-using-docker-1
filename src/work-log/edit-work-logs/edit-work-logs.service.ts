import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditWorkLogsService {
  constructor(private readonly client: PrismaService) {}
  async editWorkLogsFunc(
    context: any,
    id: number,
    attendanceCount: number[],
    lastModifiedTime: string,
    trainingInfoOne?: string[],
    trainingInfoTwo?: string[],
    trainingInfoThree?: string[],
    trainingInfoFour?: string[],
    trainingInfoFive?: string[],
    trainingInfoSix?: string[],
    trainingInfoSeven?: string[],
    trainingInfoEight?: string[],
    trainingTimeOneday?: number[],
    trainingTimeTotal?: number[],
    instruction?: string,
    absentSt?: string,
    tardySt?: string,
    leaveEarlySt?: string,
    outingSt?: string,
    etc?: string,
    lecturesId?: number,
    workLogsDate?: string,
    checkList?: string[],
    checkContext?: string[],
  ) {
    try {
      const client = this.client;
      if (!id || !lastModifiedTime) {
        throw new Error("id 와 lastModifiedTime 은 필수값 입니다.");
      }

      //아이디 존재 여부 확인
      const existingId = await client.workLogs.findUnique({
        where: {
          id,
        },
      });
      if (!existingId) {
        throw new Error("해당 업무일지가 존재 하지 않습니다 id 확인하세요.");
      }

      //수정
      const editWorkLogsData = await client.workLogs.update({
        where: {
          id,
        },
        data: {
          trainingInfoOne,
          trainingInfoTwo,
          trainingInfoThree,
          trainingInfoFour,
          trainingInfoFive,
          trainingInfoSix,
          trainingInfoSeven,
          trainingInfoEight,
          trainingTimeOneday,
          trainingTimeTotal,
          instruction,
          absentSt,
          tardySt,
          leaveEarlySt,
          outingSt,
          etc,
          attendanceCount,
          checkList,
          checkContext,
          lastModifiedTime,
        },
      });
      if (!editWorkLogsData) {
        throw new Error("데이터가 정상적으로 수정되지 않았습니다.");
      }
      return {
        ok: true,
        message: "업무일지가 정상적으로 수정되었습니다.",
      };
      //완료
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요",
        error: `Error:${error.message}`,
      };
    }
  }
}
