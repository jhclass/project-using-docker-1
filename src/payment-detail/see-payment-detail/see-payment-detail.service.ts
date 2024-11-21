import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeePaymentDetailService {
  constructor(private readonly client: PrismaService) {}
  async seePaymentDetailFunc(context: any, page?: number, limit?: number) {
    try {
      const { user } = context.req;
      const pageNum = page || 1;
      const take = limit || 10;
      const client = this.client;
      const [PaymentDetail, totalCount] = await Promise.all([
        client.paymentDetail.findMany({
          where: { branchId: user?.branchId },
          include: {
            studentPayment: {
              include: {
                subject: true,
              },
            },
          },
          take,
          skip: (pageNum - 1) * take,
          orderBy: {
            paymentDate: "desc",
          },
        }),
        client.paymentDetail.count({
          where: { branchId: user?.branchId },
        }),
      ]);
      return {
        ok: true,
        message: `PaymentDetail 의 데이터 ${totalCount} 건 검색되었습니다.`,
        PaymentDetail,
        totalCount,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
