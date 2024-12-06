import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreatePreInspectionService {
  constructor(private readonly client: PrismaService) {}
  async createPreInspectionFunc(
    context: any,
    subjectId: number,
    studentPaymentId: number,
    dateOfPreInspection?: string,
    preScreenerType?: string,
    preInspectionDetails?: string,
    actionTaken?: string,
  ) {
    try {
      //필수값 확인
      if (!subjectId || !studentPaymentId) {
        throw new Error("subjectId 와 studentPaymentId는 필수값을 입니다.");
      }
      const client = this.client;
      const { user } = context.req;
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
      await client.preInspection.create({
        data: {
          lectureId: existingSubjectId?.lectures?.id,
          studentId: existingStudentPaymentId?.student?.id,
          stName: existingStudentPaymentId?.student?.name,
          dateOfPreInspection,
          preScreenerType,
          preInspectionDetails,
          actionTaken,
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
      console.error(error.message);
      return {
        ok: false,
        error: `Error:${error.message}`,
        message: "에러발생! 에러메세지를 확인하세요.",
      };
    }
  }
}
