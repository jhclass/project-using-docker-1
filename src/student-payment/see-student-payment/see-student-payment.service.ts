import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeeStudentPaymentService {
  constructor(private readonly client: PrismaService) {}
  async seeStudentPaymentFunc(context: any, page?: number, limit?: number) {
    try {
      //
      const { user } = context.req;
      const pageNum = page || 1;
      const take = limit || 10;
      const [StudentPayment, totalCount] = await Promise.all([
        this.client.studentPayment.findMany({
          where: {
            branchId: user?.branchId,
          },
          include: {
            Career: true,
            Certificate: true,
            EduInfomation: true,
            EmploymentRecommendation: true,
            EmploymentStatus: true,
            HopeForEmployment: true,
            PreInspection: true,
            StudentConsultation: true,
            StudentPortfolio: true,
          },
          take,
          skip: (pageNum - 1) * take,
          orderBy: {
            createdAt: "desc",
          },
        }),
        this.client.studentPayment.count({
          where: {
            branchId: user?.branchId,
          },
        }),
      ]);
      //console.log(StudentPayment, totalCount);
      return {
        ok: true,
        message: `StudentPayment 의 데이터 ${totalCount}건 검색 되었습니다.`,
        totalCount,
        StudentPayment,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요`,
        error: `Error:${error.message}`,
      };
    }
  }
}
