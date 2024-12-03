import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  id?: number;
  student?: {
    is: {
      name?: {
        contains?: string;
      };
      phoneNum1?: {
        contains?: string;
      };
    };
  };
  subDiv?: string;
  subject?: {
    is: {
      lectures?: {
        is?: {
          temporaryName?: {
            contains?: string;
          };
          teachers?: {
            some?: {
              mUsername?: string;
            };
          };
        };
      };
    };
  };
}
@Injectable()
export class AcademyRecordService {
  constructor(private readonly client: PrismaService) {}
  async searchAcademyRecordFunc(
    context: any,
    id?: number,
    studentName?: string,
    phoneNum?: string,
    lectureName?: string,
    subDiv?: string,
    teacherName?: string,
    limit?: number,
    page?: number,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      const take = limit || 10;
      const pageNum = page || 1;
      const searchConditions = {} as ISearchConditions;
      if (id) {
        searchConditions.id = id;
      }
      if (lectureName) {
        searchConditions.subject = {
          is: {
            lectures: {
              is: {
                temporaryName: {
                  contains: lectureName,
                },
              },
            },
          },
        };
      }
      if (studentName) {
        searchConditions.student = {
          is: {
            name: {
              contains: studentName,
            },
          },
        };
      }
      if (phoneNum) {
        searchConditions.student = {
          is: {
            phoneNum1: {
              contains: phoneNum,
            },
          },
        };
      }
      if (subDiv) {
        searchConditions.subDiv = subDiv;
      }
      if (teacherName) {
        searchConditions.subject = {
          is: {
            lectures: {
              is: {
                teachers: {
                  some: {
                    mUsername: teacherName,
                  },
                },
              },
            },
          },
        };
      }

      const result = await client.studentPayment.findMany({
        where: {
          ...searchConditions,
          branchId: user?.branchId,
          lectureAssignment: "배정",
        },
        include: {
          EmploymentRecommendation: true,
          EmploymentStatus: true,
          StudentConsultation: true,
          StudentPortfolio: true,
        },
        skip: (pageNum - 1) * take,
        take,
        orderBy: {
          subject: {
            lectures: {
              lecturePeriodStart: "desc",
            },
          },
        },
      });

      const totalCount = await client.studentPayment.count({
        where: {
          ...searchConditions,
          branchId: user?.branchId,
          lectureAssignment: "배정",
        },
      });

      return {
        ok: true,
        result: result || [],
        totalCount: totalCount || 0,
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
