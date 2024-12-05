import { Injectable } from "@nestjs/common";

import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateEmploymentStatusService {
  constructor(private readonly client: PrismaService) {}
  async createEmplopymentStatusFunc(
    context: any,
    employmentType: string,
    dateOfEmployment: string,
    companyName: string,
    businessNum: string,
    responsibilities: string,
    location: string,
    phoneNum: string,
    businessSize: string,
    imploymentInsurance: string,
    proofOfImployment: string,
    relatedFields: string,
    completionType: string,
    subjectId: number,
    studentPaymentId: number,
  ) {
    try {
      //필수값 확인
      if (
        !employmentType ||
        !dateOfEmployment ||
        !companyName ||
        !businessNum ||
        !responsibilities ||
        !location ||
        !phoneNum ||
        !businessSize ||
        !imploymentInsurance ||
        !proofOfImployment ||
        !relatedFields ||
        !completionType ||
        !subjectId ||
        !studentPaymentId
      ) {
        throw new Error(
          "필수값을 확인하세요. 모든 데이터는 필수값으로 들어가야 합니다. ",
        );
      }
      const { user } = context.req;
      const client = this.client;
      //subjectId 와 studentPaymentId 확인 필요
      const existingSubjectId = await client.subject.findUnique({
        where: {
          id: subjectId,
        },
        include: {
          lectures: true,
        },
      });
      const existingStudentPaymentId = await client.studentPayment.findUnique({
        where: {
          id: studentPaymentId,
        },
        include: {
          student: true,
        },
      });
      const existingManageUserId = await client.manageUser.findUnique({
        where: {
          id: user?.id,
        },
      });
      if (!existingSubjectId) {
        throw new Error("subjectId 를 다시 확인하세요.");
      } else if (!existingStudentPaymentId) {
        throw new Error("studentPaymentId 를 다시 확인하세요.");
      } else if (!existingManageUserId) {
        throw new Error("manageUserId 를 다시 확인하세요.");
      } else if (!existingSubjectId.lectures) {
        throw new Error(
          "강의배정이 되지 않았습니다. 강의배정을 하고 다시 시도 하세요.",
        );
      }
      await client.employmentStatus.create({
        data: {
          lectureId: existingSubjectId?.lectures?.id,
          studentId: existingStudentPaymentId?.student?.id,
          stName: existingStudentPaymentId?.student?.name,
          employmentType,
          companyName,
          dateOfEmployment,
          businessNum,
          responsibilities,
          location,
          phoneNum,
          businessSize,
          imploymentInsurance,
          proofOfImployment,
          relatedFields,
          completionType,
          subjectId,
          studentPaymentId,
          branchId: user?.branchId,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
        },
      });
      return {
        ok: true,
        message: "정상적으로 생성완료 되었습니다.",
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: `Error:${error.message}`,
      };
    }
  }
}
