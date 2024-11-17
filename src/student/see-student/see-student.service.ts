import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeeStudentService {
  constructor(private readonly client: PrismaService) {}
  async seeStudentFunc(context: any, page?: number, limit?: number) {
    try {
      const { user } = context.req;
      const pageNum = page === null ? 1 : page;
      const ITEMS_PER_PAGE = limit === null ? 10 : limit;
      const studentLen = await this.client.student.count({
        where: {
          branchId: user?.branchId,
        },
      });
      if (studentLen === 0) {
        return {
          ok: false,
          message: "수강생이 존재하지 않습니다.",
        };
      }
      const studentList = await this.client.student.findMany({
        where: {
          branchId: user?.branchId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: ITEMS_PER_PAGE,
        skip: (pageNum - 1) * ITEMS_PER_PAGE,
      });

      return {
        ok: true,
        message: "수강생 리스트 전달완료",
        student: studentList,
        totalCount: studentLen,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "수강생 리스트가 조회되지 않습니다.",
        error: `Error: ${error.message}`,
      };
    }
  }
  // doublecheck (수강생 중복체크)
  async doubleCheckFunc(context: any, name: string, phoneNum1: string) {
    try {
      const { user } = context.req;
      //
      const existing = await this.client.student.count({
        where: {
          AND: [{ name }, { phoneNum1 }, { branchId: user?.branchId }],
        },
      });
      if (Number(existing) > 0) {
        return {
          ok: false,
          message: "이미 존재하는 학생 입니다.",
        };
      }
      return {
        ok: true,
        message: "동일한 학생이 존재하지 않습니다. 학생등록을 진행하세요.",
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
