import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditAttendanceService {
  constructor(private readonly client: PrismaService) {}
  async editAttendanceFunc(
    lastModifiedTime: string,
    id?: number[],
    attendanceState?: string[],
  ) {
    try {
      const client = this.client;
      const updatedAttendanceState = attendanceState || [];
      // 배열 길이 검증
      if (id.length !== updatedAttendanceState.length) {
        throw new Error("ID 배열과 출석 상태 배열의 길이가 일치하지 않습니다.");
      }
      if (!lastModifiedTime) {
        throw new Error("lastModifiedTime 은 필수값 입니다.");
      }
      // id 배열 전체를 검사한다.
      const existingIds = await client.attendance.findMany({
        where: {
          id: {
            in: id,
          },
        },
      });

      if (existingIds.length !== id.length) {
        throw new Error("존재하지 않는 출석 내역이 포함되어 있습니다.");
      }

      for (let i = 0; i < id.length; i++) {
        await client.attendance.update({
          where: {
            id: id[i],
          },
          data: {
            attendanceState: updatedAttendanceState[i],
            lastModifiedTime,
          },
        });
      }

      return {
        ok: true,
        message: "수정완료 되었습니다.",
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
