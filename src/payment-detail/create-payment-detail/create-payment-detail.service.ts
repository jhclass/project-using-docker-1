import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreatePaymentDetailService {
  constructor(private client: PrismaService) {}
  async createPaymentDetailFunc(
    context: any,
    cashOrCard: string,
    studentPaymentId: number,
    receiverId: number,
    cardCompany?: string,
    cardNum?: string,
    installment?: number,
    ApprovalNum?: string,
    amountPayment?: number,
    paymentDate?: string,
    bankName?: string,
    depositorName?: string,
    depositAmount?: number,
    depositDate?: string,
    cashReceipts?: string[],
  ) {
    try {
      const { user } = context.req;
      //studentPaymentId 가 존재하는지 여부 체크

      const existence = await this.client.studentPayment.findFirst({
        where: {
          id: studentPaymentId,
        },
      });
      const existenceStudent = await this.client.student.findUnique({
        where: {
          id: existence.studentId,
        },
      });
      const newCashAmount = (existence.cashAmount || 0) + (depositAmount || 0);
      const newCardAmount = (existence.cardAmount || 0) + (amountPayment || 0);
      // NaN 확인
      if (isNaN(newCashAmount) || isNaN(newCardAmount)) {
        // NaN 값인 경우 에러 처리
        return {
          ok: false,
          message: "입금액이 유효하지 않습니다.",
        };
      }
      console.log(existence);

      const checkUnpaid = existence.unCollectedAmount;
      console.log(
        `checkUnpaid: ${checkUnpaid}, amountPayment: ${
          amountPayment || 0
        }, depositAmount: ${depositAmount || 0}`,
      );
      if (checkUnpaid < (amountPayment || 0) + (depositAmount || 0)) {
        //console.log("조건문 내부로 진입");
        return {
          ok: false,
          message: "미수금보다 입금금액이 더 큽니다. 금액을 다시 확인하세요.",
        };
      }
      if (checkUnpaid > 0) {
        const createPaymentDetailOk = await this.client.paymentDetail.create({
          data: {
            cashOrCard,
            cardCompany,
            cardNum,
            installment,
            ApprovalNum,
            amountPayment,
            paymentDate,
            bankName,
            depositorName,
            depositAmount,
            depositDate,
            studentPayment: {
              connect: {
                id: studentPaymentId,
              },
            },
            receiver: {
              connect: {
                id: receiverId,
              },
            },
            stName: existenceStudent.name,
            cashReceipts,
            accountingManager: user?.mUsername,
            Branch: {
              connect: {
                id: user?.branchId,
              },
            },
          },
        });

        const existence2 = await this.client.studentPayment.findFirst({
          where: {
            id: studentPaymentId,
          },
        });
        const newCashAmount2 =
          (await (existence2.cashAmount || 0)) + (depositAmount || 0);
        const newCardAmount2 =
          (await (existence2.cardAmount || 0)) + (amountPayment || 0);
        // NaN 확인
        if (isNaN(newCashAmount2) || isNaN(newCardAmount2)) {
          // NaN 값인 경우 에러 처리
          return {
            ok: false,
            message: "입금액이 유효하지 않습니다.",
          };
        }

        await this.client.studentPayment.update({
          where: {
            id: studentPaymentId,
          },
          data: {
            unCollectedAmount:
              checkUnpaid -
              (createPaymentDetailOk.amountPayment +
                createPaymentDetailOk.depositAmount),
            cashAmount: newCashAmount2,
            cardAmount: newCardAmount2,
          },
        });
        return {
          ok: true,
          message: "데이터가 정상적으로 생성되었습니다.",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "에러발생. 데이터가 생성되지 않습니다.",
        error: `Error:${error.message}`,
      };
    }
  }
}
