import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditLecturesService {
  constructor(private readonly client: PrismaService) {}
  async editLecturesFunc(
    context: any,
    id: number,
    lastModifiedTime: string,
    campus?: string,
    temporaryName?: string,
    subDiv?: string,
    teachersId?: number[],
    roomNum?: string,
    subjectId?: number,
    lecturePeriodStart?: string,
    lecturePeriodEnd?: string,
    lectureDetails?: string[],
    lectureTime?: string[],
    eduStatusReport?: string,
    ApprovedNum?: number,
    confirmedNum?: number,
    sessionNum?: number,
    timetableAttached?: string,
  ) {
    try {
      if (!id || !lastModifiedTime) {
        throw new Error("id 와 lastModifiedTime 은 필수값 입니다.");
      }

      const client = this.client;
      // 기존 아이디가 있는지 확인
      const existingLectureId = await client.lectures.findUnique({
        where: { id },
        include: { teachers: true }, // 기존 연결된 교사 정보를 가져오기 위해 include 사용
      });

      if (!existingLectureId) {
        throw new Error("개설되지 않은 강의입니다. id를 확인하세요.");
      }

      // teachersId가 정의된 경우에만 교사 연결 및 해제 작업 수행
      let teachersData = {};
      if (teachersId !== undefined) {
        if (!Array.isArray(teachersId)) {
          throw new Error("teachersId는 배열이어야 합니다.");
        }
        // 교사 연결 및 해제를 위한 데이터 준비
        teachersData = {
          teachers: {
            disconnect: existingLectureId.teachers.map((teacher) => ({
              id: teacher.id,
            })), // 기존 연결된 모든 교사 해제
            connect: teachersId.map((id) => ({ id })), // 새로 연결할 교사들
          },
        };
      }

      // 강의 업데이트
      await client.lectures.update({
        where: { id },
        data: {
          campus,
          temporaryName,
          subDiv,
          ...teachersData,
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
