import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  id: number;
  student: {
    name: {
      contains: string;
    };
  };
  updatedAt: {
    gte: string;
    lte: string;
  };
  createdAt: {
    gte: string;
    lte: string;
  };
  subDiv: string;
  employment: string;
  lectureAssignment: string;
  branchId: number;
}
@Injectable()
export class SearchStudentPaymentService {
  constructor(private readonly client: PrismaService) {}
  async searchStudentPaymentFunc(
    context: any,
    id?: number,
    page?: number,
    limit?: number,
    studentName?: string,
    period?: string[],
    createdPeriod?: string[],
    subDiv?: string,
    employment?: string,
    lectureAssignment?: string,
  ) {
    try {
      const { user } = context.req;
      const pageNum = page || 1;
      const take = limit || 10;
      const searchConditions = {
        branchId: user?.branchId,
      } as ISearchConditions;
      if (id) {
        searchConditions.id = id;
      }
      if (studentName) {
        searchConditions.student = {
          name: {
            contains: studentName,
          },
        };
      }
      if (period) {
        searchConditions.updatedAt = {
          lte: period[1],
          gte: period[0],
        };
      }
      if (createdPeriod) {
        searchConditions.createdAt = {
          lte: createdPeriod[1],
          gte: createdPeriod[0],
        };
      }
      if (subDiv) {
        searchConditions.subDiv = subDiv;
      }
      if (employment) {
        searchConditions.employment = employment;
      }
      if (lectureAssignment) {
        searchConditions.lectureAssignment = lectureAssignment;
      }

      //console.log("searchConditions :", searchConditions);
      const studentpaymentDataOk = await this.client.studentPayment.findMany({
        where: searchConditions,
        include: {
          Career: true,
          Certificate: true,
          EduInfomation: true,
          EmploymentRecommendation: true,
          EmploymentStatus: true,
          HopeForEmployment: true,
          PreInspection: true,
          student: true,
          StudentConsultation: true,
          StudentPortfolio: true,
          subject: {
            include: {
              lectures: {
                include: {
                  teachers: true,
                },
              },
            },
          },
          paymentDetail: true,
        },
        skip: (pageNum - 1) * take,
        take,
        orderBy: {
          createdAt: "desc",
        },
      });
      //console.log(studentpaymentDataOk);
      const studentpaymentDataCount = await this.client.studentPayment.count({
        where: searchConditions,
      });
      return {
        ok: true,
        message: "데이터가 검색되었습니다.",
        data: studentpaymentDataOk,
        totalCount: studentpaymentDataCount,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "데이터가 존재하지 않습니다. 에러메세지를 확인하세요",
        error: `Error:${error.message}`,
      };
    }
  }
}
