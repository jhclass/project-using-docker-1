import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface IGetAllAttendanceData {
  attendanceDate: string;
  lecturesId: number;
  branchId: number;
}
interface IGetAttendanceDataEach {
  attendanceDate: string;
  lecturesId: number;
  attendanceState: string;
  branchId: number;
}
@Injectable()
export class SeeAttendanceService {
  constructor(private readonly client: PrismaService) {}

  private async getAllAttendanceData(params: IGetAllAttendanceData) {
    const { attendanceDate, lecturesId, branchId } = params;
    const client = this.client;
    const data = await client.attendance.findMany({
      where: {
        attendanceDate,
        lecturesId,
        branchId,
      },
      include: {
        student: true,
        lectures: true,
        studentPayment: true,
      },
    });

    const count = await client.attendance.count({
      where: {
        attendanceDate,
        lecturesId,
        branchId,
      },
    });

    return { data, count };
  }

  private async getAttendanceData(
    GetAttendanceDataEach: IGetAttendanceDataEach,
  ) {
    const client = this.client;
    const { attendanceDate, lecturesId, attendanceState, branchId } =
      GetAttendanceDataEach;
    const data = await client.attendance.findMany({
      where: {
        attendanceDate,
        lecturesId,
        attendanceState,
        branchId,
      },
      include: {
        student: true,
        lectures: true,
        studentPayment: true,
      },
    });
    const count = await client.attendance.count({
      where: {
        attendanceDate,
        lecturesId,
        attendanceState,
        branchId,
      },
    });
    return { data, count };
  }
  async seeAttendanceFunc(
    context: any,
    attendanceDate: string,
    lecturesId: number,
  ) {
    try {
      const { user } = context.req;
      const branchId = user?.branchId;
      const params = {
        attendanceDate,
        lecturesId,
        branchId,
      };
      const seeAttendanceDataAll = await this.getAllAttendanceData(params);

      if (seeAttendanceDataAll.data.length === 0) {
        throw new NotFoundException(
          "데이터가 존재하지 않습니다.attendanceDate, lectureId 를 확인하세요.",
        );
      }
      const attendanceDatas = {
        attendanceDate,
        lecturesId,
        attendanceState: "출석",
        branchId,
      };
      const tardyDatas = {
        attendanceDate,
        lecturesId,
        attendanceState: "지각",
        branchId,
      };
      const absentDatas = {
        attendanceDate,
        lecturesId,
        attendanceState: "결석",
        branchId,
      };
      const leaveEarlyDatas = {
        attendanceDate,
        lecturesId,
        attendanceState: "조퇴",
        branchId,
      };
      const outingDatas = {
        attendanceDate,
        lecturesId,
        attendanceState: "외출",
        branchId,
      };
      const attendanceData = await this.getAttendanceData(attendanceDatas);
      const tardyData = await this.getAttendanceData(tardyDatas);
      const absentData = await this.getAttendanceData(absentDatas);
      const leaveEarlyData = await this.getAttendanceData(leaveEarlyDatas);
      const outingData = await this.getAttendanceData(outingDatas);

      return {
        ok: true,
        enrollData: seeAttendanceDataAll.data || [],
        enrollCount: seeAttendanceDataAll.count || 0,
        attendanceData: attendanceData.data || [],
        attendanceCount: attendanceData.count || 0,
        absentData: absentData.data || [],
        absentCount: absentData.count || 0,
        leaveEarlyData: leaveEarlyData.data || [],
        leaveEarlyCount: leaveEarlyData.count || 0,
        outingData: outingData.data || [],
        outingCount: outingData.count || 0,
        tardyData: tardyData.data || [],
        tardyCount: tardyData.count || 0,
      };
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
