import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateAttendanceService {
  constructor(private readonly client: PrismaService) {}
  async createAttendanceFunc(
    context: any,
    attendanceDate: string,
    lecturesId: number,
    studentPaymentId?: number[],
    studentId?: number[],
    attendanceState?: string[],
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      //입력한 배열의 길이가 일치하는가?
      if (
        studentPaymentId.length !== studentId.length ||
        studentId.length !== attendanceState.length
      ) {
        throw new Error("입력 배열의 길이가 일치하지 않습니다.");
      }
      //오늘 생성된 출석부 데이터가 있을까?

      const existingAttendanceData = await client.attendance.findFirst({
        where: {
          lecturesId,
          attendanceDate,
        },
      });
      if (existingAttendanceData) {
        throw new Error(`오늘 출석부는 이미 생성되어 있습니다.`);
      }

      //데이트 생성
      //const realDate = parseLocalDate(attendanceDate);
      //console.log(realDate,"datetime 으로 전송될 시간.")
      const attendanceDateArray = await Promise.all(
        studentPaymentId.map((_, index) => {
          return client.attendance.create({
            data: {
              studentPaymentId: studentPaymentId[index],
              attendanceDate: attendanceDate,
              studentId: studentId[index],
              attendanceState: attendanceState[index],
              lecturesId,
              branchId: user?.branchId,
            },
          });
        }),
      );
      //데이터 생성 결과 확인
      if (attendanceDateArray.some((data) => !data)) {
        throw new Error("일부 데이터가 생성되지 않았습니다.");
      }
      return {
        ok: true,
        message: "데이터가 정상적으로 생성되었습니다.",
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
