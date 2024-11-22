import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface IsearchConditions {
  paymentDate: {
    gte: string;
    lte: string;
  };
  refundApprovalDate: {
    gte: string;
    lte: string;
  };
}
@Injectable()
export class StatisticsService {
  constructor(private readonly client: PrismaService) {}
  async salesStatisticsFunc(
    context: any,
    period?: string[],
    receiverId?: number[],
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      // 1차 검증
      // 영업직원이 맞는가?
      const existingManagerOk = await client.manageUser.findMany({
        where: {
          id: {
            in: receiverId,
          },
          branchId: user?.branchId,
        },
        select: {
          id: true,
        },
      });

      const validManagerIds = existingManagerOk.map((manager) => manager.id);

      // 조건
      const searchConditions = {} as IsearchConditions;
      const searchConditionsRefund = {} as IsearchConditions;
      if (period) {
        searchConditions.paymentDate = {
          gte: period[0],
          lte: period[1],
        };
      }
      if (period) {
        searchConditionsRefund.refundApprovalDate = {
          gte: period[0],
          lte: period[1],
        };
      }

      //초기
      const initialResults = {};
      const initialRefundResults = {};
      receiverId.forEach((id) => {
        initialResults[id] = {
          totalAmount: 0,
          totalCount: 0,
        };
        initialRefundResults[id] = {
          totalRefundAmount: 0,
          totalCount: 0,
        };
      });
      //모든 데이터 검색
      const allPaymentsData = await client.paymentDetail.findMany({
        where: {
          ...searchConditions,
          receiverId: {
            in: validManagerIds,
          },
          branchId: context.loggedInManager?.branchId,
        },
      });
      // 모든 환불금액
      const allRefundData = await client.paymentDetail.findMany({
        where: {
          ...searchConditionsRefund,
          receiverId: {
            in: validManagerIds,
          },
          refundApproval: true,
          branchId: context.loggedInManager?.branchId,
        },
      });
      //console.log("전체 데이터:", allPaymentsData);
      // 총 금액과 총 건수 계산
      allPaymentsData.forEach((item) => {
        const id = item.receiverId;
        // console.log(
        //   item.amountPayment || 0,
        //   item.depositAmount || 0,
        //   "아이템!"
        // );
        initialResults[id].totalAmount +=
          (item.amountPayment || 0) + (item.depositAmount || 0);
        initialResults[id].totalCount += 1;
      });
      console.log("계산된 총액과 건수:", initialResults);

      //총 환불금액을 계산
      allRefundData.forEach((item) => {
        const id = item.receiverId;
        initialRefundResults[id].totalRefundAmount +=
          (item.amountPayment || 0) + (item.depositAmount || 0);
        initialRefundResults[id].totalCount += 1;
      });
      // 결과 데이터 구조 조정
      const results = Object.keys(initialResults).map((managerId) => ({
        receiverId: parseInt(managerId), // managerId를 숫자로 변환(필요한 경우)
        totalAmount: initialResults[managerId].totalAmount || 0,
        totalRefundAmount:
          initialRefundResults[managerId].totalRefundAmount || 0,
        totalActualAmount:
          initialResults[managerId].totalAmount -
            initialRefundResults[managerId].totalRefundAmount || 0,
        totalPaymentCount: initialResults[managerId].totalCount || 0,
        totalRefundCount: initialRefundResults[managerId].totalCount || 0,
      }));

      // 총 금액 많은 순으로 정렬
      const sortedData = results.sort(
        (a, b) => b.totalActualAmount - a.totalActualAmount,
      );
      return {
        ok: true,
        data: sortedData,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러사유를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
