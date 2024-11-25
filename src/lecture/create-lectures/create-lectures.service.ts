import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateLecturesService {
  constructor(private readonly client: PrismaService) {}
  async createLecturesFunc(
    context: any,
    campus: string,
    temporaryName: string,
    subDiv: string,
    teachersId: number[],
    roomNum: string,
    subjectId: number,
    lecturePeriodStart: string,
    lecturePeriodEnd: string,
    lectureDetails: string[],
    lectureTime: string[],
    eduStatusReport: string,
    ApprovedNum: number,
    confirmedNum: number,
    sessionNum: number,
    timetableAttached?: string,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;

      //subjectId 가 중복되면 안됩니다.
      //1lec 1sub.

      const existingSubjectId = await client.lectures.count({
        where: {
          subjectId,
        },
      });
      console.log(existingSubjectId, "뭐가잇나?");
      if (existingSubjectId > 0) {
        throw new Error(
          "과정이 중복됩니다 . 과정이 중복된 강의는 배정할 수 없습니다.",
        );
      }
      await client.lectures.create({
        data: {
          campus,
          temporaryName,
          subDiv,
          teachers: {
            //manageUser 테이블의 id 와 연계
            connect: teachersId.map((id) => ({ id })),
          },
          roomNum,
          subjectId,
          lecturePeriodStart,
          lecturePeriodEnd,
          lectureDetails,
          lectureTime,
          eduStatusReport,
          ApprovedNum,
          confirmedNum,
          sessionNum,
          timetableAttached,
          branchId: user?.branchId,
        },
      });
      return {
        ok: true,
        message: "정상적으로 강의일정(이)가 생성되었습니다.",
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요",
        error: `Error:${error.message}`,
      };
    }
  }
}
