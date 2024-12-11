import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class DuplicateCheckService {
  constructor(private readonly client: PrismaService) {}
  async duplicateCheckFunc(context: any, studentId: number, subjectId: number) {
    try {
      const { user } = context.req;
      const client = this.client;
      const existStudentpaymentData = await client.studentPayment.findFirst({
        where: {
          studentId,
          subjectId,
          lectureAssignment: "배정",
          branchId: user?.branchId,
        },
      });
      if (existStudentpaymentData) {
        throw new ConflictException("강의가 중복됩니다. 배정할 수 없습니다.");
      }
      return {
        ok: true,
        message: "중복되는 데이터가 없습니다.",
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "에러발생 아래 에러메세지를 확인하세요",
        error: `Error:${error.message}`,
      };
    }
  }
}
