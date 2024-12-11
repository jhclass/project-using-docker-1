import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateStudentPaymentService {
  constructor(private readonly client: PrismaService) {}
  async createStudentPaymentFunc(
    context: any,
    campus: string,
    tuitionFee: number,
    studentId: number,
    processingManagerId: number,
    subjectId: number,
    seScore?: number,
    discountAmount?: string,
    cashAmount?: number,
    cardAmount?: number,
    actualAmount?: number,
    unCollectedAmount?: number,
    receiptClassification?: string[],
    paymentDate?: string,
    situationReport?: boolean,
    amountReceived?: number,
    subDiv?: string,
    courseComplete?: string,
    employment?: string,
    dueDate?: string,
    classCode?: string,
    lectureAssignment?: string,
    isWeekend?: string,
    supportType?: string,
  ) {
    try {
      const { user } = context.req;
      //console.log(context.loggedInManager.branchId);
      const checkSubject = await this.client.studentPayment.findFirst({
        where: {
          student: {
            id: studentId,
          },
          subject: {
            id: subjectId,
          },
        },
      });
      if (checkSubject) {
        return {
          ok: false,
          message: "과정명이 중복됩니다.",
        };
      }
      await this.client.studentPayment.create({
        data: {
          campus,
          seScore: seScore || 0,
          tuitionFee,
          discountAmount,
          cashAmount,
          cardAmount,
          actualAmount,
          unCollectedAmount,
          receiptClassification,
          paymentDate,
          situationReport,
          amountReceived,
          Branch: {
            connect: {
              id: user?.branchId,
            },
          },
          student: {
            connect: { id: studentId },
          },
          subject: {
            connect: {
              id: subjectId,
            },
          },
          processingManager: {
            connect: {
              id: processingManagerId,
            },
          },
          subDiv,
          employment,
          dueDate,
          classCode,
          lectureAssignment,
          isWeekend,
          courseComplete,
          supportType,
          lastModifiedByName: user?.mUsername,
          lastModifiedByUserId: user?.mUserId,
        },
      });
      //알람등록
      //매니져 출력
      const targetManagerIds = await this.client.manageUser.findMany({
        where: {
          PermissionsGranted: {
            some: {
              id: 11,
            },
          },
        },
        select: {
          id: true,
        },
      });

      const filterTargetIds = targetManagerIds
        .filter((manager) => manager.id !== user?.id)
        .map((manager) => manager.id);

      const createAlarm = await this.client.alarm.create({
        data: {
          title: "수강신청 | 결제내역확인",
          content: `${user?.mUsername}(${user?.mUserId})님이 수강신청 등록을 하였습니다. 결제내역을 확인하여주세요.`,
          personalTarget: filterTargetIds,
          branchId: user?.branchId,
        },
      });
      if (!createAlarm) {
        throw new InternalServerErrorException(
          "알람이 제대로 생성되지 않았습니다.",
        );
      }
      //웹소켓발송
      return {
        ok: true,
        message: "수강신청정보가 작성완료 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
    }
  }
}
