import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SearchSmService {
  constructor(private readonly client: PrismaService) {}
  async searchSMFunc(
    context: any,
    modelType: string,
    lectureId?: number,
    studentPaymentId?: number,
    subjectId?: number,
    limit?: number,
    page?: number,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      // 모델 타입 매핑
      const modelMap = {
        Career: client.career,
        EduInfomation: client.eduInfomation,
        Certificate: client.certificate,
        StudentConsultation: client.studentConsultation,
        HopeForEmployment: client.hopeForEmployment,
        EmploymentRecommendation: client.employmentRecommendation,
        EmploymentStatus: client.employmentStatus,
        PreInspection: client.preInspection,
        StudentPortfolio: client.studentPortfolio,
      };
      const model = modelMap[modelType];
      if (!model) throw new Error("Invalid modelType");
      const pageNum = page || 1;
      const take = limit || 3;
      //lectureId
      if (lectureId) {
        const existingLectureId = await client.lectures.findUnique({
          where: {
            id: lectureId,
          },
        });
        if (!existingLectureId) {
          throw new Error("lectureId 가 존재하는지 다시 확인하시기 바랍니다.");
        }
      }
      if (studentPaymentId) {
        const existingStudentPaymentId = await client.studentPayment.findUnique(
          {
            where: { id: studentPaymentId },
          },
        );
        if (!existingStudentPaymentId) {
          throw new Error(
            "studentPaymentId 가 존재하는지 다시 확인하시기 바랍니다.",
          );
        }
      }
      if (subjectId) {
        const existingSubjectId = await client.subject.findUnique({
          where: {
            id: subjectId,
          },
        });
        if (!existingSubjectId) {
          throw new Error("subjectId 가 존재하는지 다시 확인하시기 바랍니다.");
        }
      }
      const branchId = user?.branchId;
      const searchConditions = {} as any;
      if (lectureId) {
        searchConditions.lectureId = lectureId;
      }
      if (subjectId) {
        searchConditions.subjectId = subjectId;
      }
      if (studentPaymentId) {
        searchConditions.studentPaymentId = studentPaymentId;
      }
      if (branchId) {
        searchConditions.branchId = branchId;
      }

      const [result, totalCount] = await Promise.all([
        model.findMany({
          where: searchConditions,
          skip: (pageNum - 1) * take,
          take,
          orderBy: {
            createdAt: "desc",
          },
        }),
        model.count({
          where: searchConditions,
        }),
      ]);
      console.log(result);
      if (totalCount === 0) {
        return {
          ok: true,
          message: `${totalCount} 건의 데이터가 검색되었습니다.`,
          data: [],
          totalCount,
        };
      }
      return {
        ok: true,
        message: `${totalCount} 건의 데이터가 검색되었습니다.`,
        totalCount: totalCount,
        data: result,
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
