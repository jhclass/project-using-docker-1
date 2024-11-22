import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  branchId: number;
  paymentDate: {
    gte: string;
    lte: string;
  };
}
@Injectable()
export class SalesDataService {
  constructor(private readonly client: PrismaService) {}
  async getHourlySalesDataFunc(context: any, date: string[]) {
    try {
      const client = this.client;
      const { user } = context.req;

      const branchId = user?.branchId;
      const searchConditions = {} as ISearchConditions;
      if (branchId) {
        searchConditions.branchId = branchId;
      }
      if (date) {
        searchConditions.paymentDate = {
          // gte: new Date(date[0]),
          // lte: new Date(date[1]),
          gte: date[0],
          lte: date[1],
        };
      }
      //console.log(date, "날짜");
      const hourlyDataOk = await client.paymentDetail.findMany({
        where: searchConditions,
        orderBy: {
          paymentDate: "asc",
        },
      });
      const totalCard = hourlyDataOk
        .filter(
          (data) => data.cashOrCard === "카드" && data.refundApproval === false,
        )
        .reduce((acc, curr) => {
          const depositAmount = curr.depositAmount || 0;
          const amountPayment = curr.amountPayment || 0;
          return acc + depositAmount + amountPayment;
        }, 0);
      const totalCash = hourlyDataOk
        .filter(
          (data) => data.cashOrCard === "현금" && data.refundApproval === false,
        )
        .reduce((acc, curr) => {
          const depositAmount = curr.depositAmount || 0;
          const amountPayment = curr.amountPayment || 0;
          return acc + depositAmount + amountPayment;
        }, 0);
      const totalCardRefund = hourlyDataOk
        .filter(
          (data) => data.cashOrCard === "카드" && data.refundApproval === true,
        )
        .reduce((acc, curr) => {
          const depositAmount = curr.depositAmount || 0;
          const amountPayment = curr.amountPayment || 0;
          return acc + depositAmount + amountPayment;
        }, 0);
      const totalCashRefund = hourlyDataOk
        .filter(
          (data) => data.cashOrCard === "현금" && data.refundApproval === true,
        )
        .reduce((acc, curr) => {
          const depositAmount = curr.depositAmount || 0;
          const amountPayment = curr.amountPayment || 0;
          return acc + depositAmount + amountPayment;
        }, 0);
      const totalTrue = hourlyDataOk
        .filter((data) => data.refundApproval === true)
        .reduce((acc, curr) => {
          const depositAmount = curr.depositAmount || 0;
          const amountPayment = curr.amountPayment || 0;
          return acc + depositAmount + amountPayment;
        }, 0);

      // refundApproval이 false인 항목의 총합 계산
      const totalFalse = hourlyDataOk
        .filter((data) => data.refundApproval === false)
        .reduce((acc, curr) => {
          const depositAmount = curr.depositAmount || 0;
          const amountPayment = curr.amountPayment || 0;
          return acc + depositAmount + amountPayment;
        }, 0);

      console.log(`refundApproval true 총합: ${totalTrue}`);
      console.log(`refundApproval false 총합: ${totalTrue}`);

      const mappedData = hourlyDataOk.map((data) => ({
        cashOrCard: data.cashOrCard,
        nowDate: data.paymentDate,
        currentState: data.refundApproval ? "환불" : "결제",
        amount: (data.depositAmount || 0) + (data.amountPayment || 0),
      }));
      //console.log(hourlyDataOk, "뭐지");

      return {
        ok: true,
        hourlyDetails: mappedData,
        hourlyTotalCard: totalCard,
        hourlyTotalCardRefund: totalCardRefund,
        hourlyTotalCash: totalCash,
        hourlyTotalCashRefund: totalCashRefund,
        thisTimeRefundTotal: totalTrue,
        thisTimeAmountTotal: totalFalse,
        thisTimeRealTotal: totalFalse - totalTrue,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        error: `Error:${error.message}`,
      };
    }
  }
}
