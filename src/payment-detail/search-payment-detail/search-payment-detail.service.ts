import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface IOrderByType {
  id: "desc";
  reqRefundDate: "desc";
  refundApprovalDate: "desc";
  paymentDate: "desc";
}
interface ISearchConditions {
  id: number;
  createdAt: {
    gte: string;
    lte: string;
  };
  paymentDate: {
    gte: string;
    lte: string;
  };
  receiverId: number;
  reqRefundDate: {
    gte: string;
    lte: string;
  };
  refundApprovalDate: {
    gte: string;
    lte: string;
  };
  stName: {
    contains: string;
    mode: "insensitive";
  };
  ApprovalNum: string;
  reqRefund: boolean;
  refundApproval: boolean;
  branchId: number;
}
@Injectable()
export class SearchPaymentDetailService {
  constructor(private readonly client: PrismaService) {}
  async searchPaymentDetailFunc(
    context: any,
    id?: number,
    period?: string[],
    stName?: string,
    page?: number,
    limit?: number,
    reqRefund?: boolean,
    refundApproval?: boolean,
    reqRefundDate?: string[],
    receiverId?: number,
    refundApprovalDate?: string[],
    ApprovalNum?: string, //승인번호
    sortOf?: string,
    paymentDate?: string[],
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      const pageNum = page || 1;
      const take = limit || 10;
      const existingId = await client.paymentDetail.findUnique({
        where: { id },
      });
      console.log(existingId);
      //기간
      //이름
      const searchConditions = {
        branchId: user?.branchId,
      } as ISearchConditions;
      const orderByType = {} as IOrderByType;
      //orderByType
      if (sortOf === null || sortOf === undefined) {
        orderByType.id = "desc";
      }
      if (sortOf === "reqRefundDate") {
        orderByType.reqRefundDate = "desc";
      }
      if (sortOf === "refundApprovalDate") {
        orderByType.refundApprovalDate = "desc";
      }
      if (sortOf === "paymentDate") {
        orderByType.paymentDate = "desc";
      }

      //searchConditions

      if (id) {
        searchConditions.id = id;
      }
      if (period) {
        searchConditions.createdAt = {
          //결제일시 결제내역의 정렬과 같도록
          gte: period[0],
          lte: period[1],
        };
      }
      if (paymentDate) {
        searchConditions.paymentDate = {
          gte: paymentDate[0],
          lte: paymentDate[1],
        };
      }
      if (receiverId) {
        searchConditions.receiverId = receiverId;
      }
      if (reqRefundDate) {
        searchConditions.reqRefundDate = {
          gte: reqRefundDate[0],
          lte: reqRefundDate[1],
        };
      }
      if (refundApprovalDate) {
        searchConditions.refundApprovalDate = {
          gte: refundApprovalDate[0],
          lte: refundApprovalDate[1],
        };
      }
      if (stName) {
        searchConditions.stName = {
          contains: stName,
          mode: "insensitive", // 대소문자 무시 옵션
        };
      }
      if (ApprovalNum) {
        searchConditions.ApprovalNum = ApprovalNum;
      }
      if (reqRefund && refundApproval) {
        searchConditions.reqRefund = reqRefund;
        searchConditions.refundApproval = refundApproval;
      }
      if (reqRefund && !refundApproval) {
        searchConditions.reqRefund = reqRefund;
        searchConditions.refundApproval = refundApproval;
      }
      if (!reqRefund && !refundApproval) {
        searchConditions.reqRefund = reqRefund;
        searchConditions.refundApproval = refundApproval;
      }
      if (!reqRefund && refundApproval) {
        return {
          ok: false,
          error:
            "reqRefund 가 false 이면 아무도 환불신청을 하지 않은 것입니다.",
        };
      }
      //console.log(searchConditions);
      const [searchOk, totalCount] = await Promise.all([
        client.paymentDetail.findMany({
          where: searchConditions,
          include: {
            studentPayment: {
              include: {
                subject: true,
                student: true,
              },
            },
          },
          take,
          skip: (pageNum - 1) * take,
          orderBy: orderByType,
        }),
        client.paymentDetail.count({
          where: searchConditions,
        }),
      ]);
      return {
        ok: true,
        message: `PaymentDetail 의 데이터 ${totalCount}건 이 검색 되었습니다.`,
        PaymentDetail: searchOk,
        totalCount,
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
