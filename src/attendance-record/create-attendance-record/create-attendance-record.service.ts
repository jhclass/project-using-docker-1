import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateAttendanceRecordService {
  constructor(private readonly client: PrismaService) {}
  async createAttendanceFunc(context: any, clockIn: string) {
    try {
      const { user } = context.req;
      if (!clockIn) {
        throw new BadRequestException("출근 시간이 입력되지 않았습니다.");
      }
      await this.client.attendanceRecord.create({
        data: {
          clockIn,
          branchId: user?.branchId,
          manageUserId: user?.id,
        },
      });
      return {
        ok: true,
        message: `정상적으로 생성 완료 되었습니다.`,
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
