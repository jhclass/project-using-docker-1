import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditPaymentDetailService {
  constructor(private readonly client: PrismaService) {}
  async editPaymentDetailFunc(
    context: any,
    id: number,
    cashOrCard: string,
    studentPaymentId: number,
    receiverId: number,
    lastModifiedTime: string,
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
      if (!id || !lastModifiedTime) {
        throw new BadRequestException(
          "id 와 lastModifiedTime 은 필수값 입니다.",
        );
      }
      const { user } = context.req;
      //존재 여부
      const editPaymentDetailOk = await this.client.paymentDetail.findUnique({
        where: {
          id,
        },
      });
      //StudentPayment
      const studentPaymentData = await this.client.studentPayment.findUnique({
        where: {
          id: studentPaymentId,
        },
      });

      if (!editPaymentDetailOk) {
        return {
          ok: false,
          message: "데이터가 존재하지 않습니다.",
        };
      }

      //detailPayment 에서 같은 studentPaymentId 를 갖고 있는 데이터
      const beforeSameDpData = await this.client.paymentDetail.findMany({
        where: {
          studentPaymentId,
          refundApproval: false,
        },
      });

      //sameDpData
      //// reduce 함수의 첫 번째 인자는 누적기(accumulator), 두 번째 인자는 현재 값(currentValue)입니다.
      const beforeTotalSums = beforeSameDpData.reduce(
        (totals, current) => {
          return {
            //카드합
            totalAmountPayment:
              totals.totalAmountPayment + (current.amountPayment || 0),
            //현금합
            totalDepositAmount:
              totals.totalDepositAmount + (current.depositAmount || 0),
          };
        },
        { totalAmountPayment: 0, totalDepositAmount: 0 },
      );

      // 수정할 데이터에 대한 합계를 계산합니다.
      const newTotalSums = {
        totalAmountPayment:
          beforeTotalSums.totalAmountPayment -
          (editPaymentDetailOk.amountPayment || 0) +
          (amountPayment || 0),
        totalDepositAmount:
          beforeTotalSums.totalDepositAmount -
          (editPaymentDetailOk.depositAmount || 0) +
          (depositAmount || 0),
      };
      //   console.log(
      //     "수정금액 합",
      //     newTotalSums.totalAmountPayment,
      //     newTotalSums.totalDepositAmount
      //   );
      //업데이트 studentPayment
      //미수금 금액 체크

      const checkActualAmount = studentPaymentData.actualAmount;

      // 미수금 조건을 확인합니다.
      if (
        newTotalSums.totalAmountPayment + newTotalSums.totalDepositAmount >
        checkActualAmount
      ) {
        // 수정 후 총합이 미수금보다 클 경우 에러를 반환합니다.
        return {
          ok: false,
          message: "수정 후 총합이 실결제 금액보다 큽니다.",
        };
      }

      await this.client.paymentDetail.update({
        where: {
          id,
        },
        data: {
          cashOrCard,
          cardCompany,
          cardNum,
          installment,
          ApprovalNum,
          amountPayment: amountPayment || 0,
          paymentDate,
          bankName,
          depositorName,
          depositAmount: depositAmount || 0,
          depositDate,
          receiverId,
          cashReceipts,
          accountingManager: user?.mUsername,
          lastModifiedTime,
        },
      });

      // 수정이 완료된 값 받기
      const afterSameDpData = await this.client.paymentDetail.findMany({
        where: {
          studentPaymentId,
          refundApproval: false,
        },
      });
      //console.log(afterSameDpData);

      //sameDpData
      //// reduce 함수의 첫 번째 인자는 누적기(accumulator), 두 번째 인자는 현재 값(currentValue)입니다.
      const afterTotalSums = afterSameDpData.reduce(
        (totals, current) => {
          return {
            //카드합
            totalAmountPayment:
              totals.totalAmountPayment + (current.amountPayment || 0),
            //현금합
            totalDepositAmount:
              totals.totalDepositAmount + (current.depositAmount || 0),
          };
        },
        { totalAmountPayment: 0, totalDepositAmount: 0 },
      );

      //   console.log(
      //     afterTotalSums.totalAmountPayment,
      //     afterTotalSums.totalDepositAmount
      //   );
      //확인 후
      await this.client.studentPayment.update({
        where: {
          id: studentPaymentId,
        },
        data: {
          cashAmount: afterTotalSums.totalDepositAmount,
          cardAmount: afterTotalSums.totalAmountPayment,
          unCollectedAmount:
            checkActualAmount -
            (afterTotalSums.totalDepositAmount +
              afterTotalSums.totalAmountPayment),
        },
      });
      return {
        ok: true,
        message: "정상적으로 수정이 완료되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생. 데이터가 정상적으로 입력되지 않습니다.",
        error: `Error:${error.message}`,
      };
    }
  }
}
