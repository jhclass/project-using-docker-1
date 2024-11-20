import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditStudentPaymentService {
  constructor(private readonly client: PrismaService) {}
  async editStudentPaymentFunc(
    context: any,
    id: number,
    subjectId: number,
    campus?: string,
    seScore?: number,
    subject?: string,
    tuitionFee?: number,
    discountAmount?: string,
    cashAmount?: number,
    cardAmount?: number,
    actualAmount?: number,
    unCollectedAmount?: number,
    receiptClassification?: string[],
    paymentDate?: string,
    processingManagerId?: number,
    situationReport?: boolean,
    amountReceived?: number,
    subDiv?: string,
    courseComplete?: string,
    employment?: string,
    dueDate?: string,
    classCode?: string,
    lectureAssignment?: string,
    isWeekend?: string,
    mZipCode?: string,
    mAddresses?: string,
    mAddressDetail?: string,
    supportType?: string,
    lastModifiedTime?: string,
  ) {
    try {
      const { user } = context.req;
      if (!id) {
        throw new Error("id 는 필수값 입니다.");
      }
      const existing = await this.client.studentPayment.findFirst({
        where: {
          id,
        },
      });

      if (!existing) {
        throw new Error("해당 studentPayment 의 id 는 존재하지 않습니다.");
      }

      await this.client.studentPayment.update({
        where: {
          id,
        },
        data: {
          seScore,
          tuitionFee,
          discountAmount,
          cashAmount,
          cardAmount,
          actualAmount,
          unCollectedAmount,
          receiptClassification,
          paymentDate,
          processingManagerId: processingManagerId, // 수정됨
          situationReport,
          amountReceived,
          subjectId: subjectId, // 수정됨
          campus,
          subDiv,
          employment,
          dueDate,
          classCode,
          lectureAssignment,
          isWeekend,
          mZipCode,
          mAddresses,
          mAddressDetail,
          supportType,
          lastModifiedTime,
          lastModifiedByName: user?.mUsername,
          lastModifiedByUserId: user?.mUserId,
        },
      });
      return {
        ok: true,
        message: "정상적으로 수정이 완료 되었습니다.",
      };
    } catch (error) {
      console.error(error.messagee);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
