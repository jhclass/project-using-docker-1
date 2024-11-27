import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  id: number;
  attendanceDate: {
    in: string[];
  };
  studentId: number;
  lecturesId: number;
  studentPaymentId: number;
  branchId: number;
}
@Injectable()
export class SearchAttendanceService {
  constructor(private readonly client: PrismaService) {}
  async searchAttendanceFunc(
    context: any,
    lecturesId: number,
    id?: number,
    attendanceDate?: string[],
    studentId?: number,
    studentPaymentId?: number,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      const branchId = user?.branchId;
      const searchConditions = {} as ISearchConditions;
      if (id) {
        searchConditions.id = id;
      }
      if (attendanceDate && attendanceDate.length > 0) {
        searchConditions.attendanceDate = {
          in: attendanceDate,
        };
      }
      if (studentId) {
        searchConditions.studentId = studentId;
      }
      if (lecturesId) {
        searchConditions.lecturesId = lecturesId;
      }
      if (studentPaymentId) {
        searchConditions.studentPaymentId = studentPaymentId;
      }
      if (branchId) {
        searchConditions.branchId = branchId;
      }

      const [searchAttendanceDataResult, totalCount] = await Promise.all([
        client.attendance.findMany({
          where: searchConditions,
          include: {
            student: true,
            studentPayment: true,
            lectures: true,
          },
        }),
        client.attendance.count({
          where: searchConditions,
        }),
      ]);
      //console.log(searchAttendanceDataResult, totalCount);
      return {
        ok: true,
        data: searchAttendanceDataResult,
        totalCount,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        error: `Error:${error.message}`,
      };
    }
  }
}
