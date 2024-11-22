import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class RefundService {
  constructor(private readonly client: PrismaService) {}
  async reqRefundFunc(
    context: any,
    id: number,
    reqRefund: boolean,
    reqRefundDate: string,
  ) {
    try {
      const client = this.client;
      const { user } = context.req;
      //데이터 존재여부확인
      const existingId = await client.paymentDetail.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
      await client.paymentDetail.update({
        where: {
          id,
        },
        data: {
          reqRefund,
          reqRefundManager: user?.mUsername,
          reqRefundManagerId: user?.id,
          reqRefundDate,
        },
      });
      //알람등록
      //매니져 출력
      const targetManager = await client.manageUser.findMany({
        where: {
          PermissionsGranted: {
            some: {
              id: 11,
            },
          },
        },
      });
      console.log("회계팀 정보 출력되니?", targetManager);
      const targetManagerIds = targetManager.map((manager) => manager.id);
      console.log("회계팀 매니저 ID 리스트:", targetManagerIds);
      const filteredTargetManagerIds = targetManagerIds.filter(
        (id) => id !== user?.id,
      );
      if (reqRefund) {
        const createAlarm = await client.alarm.create({
          data: {
            title: "환불신청완료",
            content: `${user?.mUsername}(${user?.mUserId})님이 환불신청 하였습니다.`,
            personalTarget: filteredTargetManagerIds,
            branchId: user?.branchId,
          },
        });
        if (!createAlarm) {
          throw new Error("알람이 제대로 생성되지 않았습니다.");
        }
      } else {
        if (
          !filteredTargetManagerIds.includes(
            Number(existingId?.reqRefundManager),
          )
        ) {
          filteredTargetManagerIds.push(existingId?.reqRefundManagerId);
        }
        console.log("회계팀 매니저 추가 ID 리스트:", targetManagerIds);
        const createAlarm = await client.alarm.create({
          data: {
            title: "환불신청철회",
            content: `${user?.mUsername}(${user?.mUserId})님이 환불신청철회 하였습니다.`,
            personalTarget: filteredTargetManagerIds,
            branchId: user?.branchId,
          },
        });
        if (!createAlarm) {
          throw new Error("알람이 제대로 생성되지 않았습니다.");
        }
      }

      return {
        ok: true,
        message: "환불신청 변경완료",
      };
      //데이터 변경 (reqRefund, reqRefundManager)
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "에러발생! 에러메세지 확인",
        error: `Error:${error.message}`,
      };
    }
  }
  //reqApprovalFunc
  async refundApprovalFunc(
    context: any,
    id: number,
    refundApproval: boolean,
    refundApprovalDate: string,
    studentPaymentId: number,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      //데이터 존재여부확인
      const existingId = await client.paymentDetail.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
      await client.paymentDetail.update({
        where: {
          id,
        },
        data: {
          refundApproval,
          refundManager: user?.mUsername,
          refundApprovalDate,
        },
      });
      //현재 결제 값
      const currentStudentPayment = await client.studentPayment.findUnique({
        where: {
          id: studentPaymentId,
        },
      });
      //현재 카드 금액
      const cspCard = currentStudentPayment.cardAmount || 0;
      //현재 현금 금액
      const cspCash = currentStudentPayment.cashAmount || 0;
      //현재 미수금 값
      const cspUnCollectedAmount = currentStudentPayment.unCollectedAmount || 0;
      //취소 결제 값
      const cancelPayment = await client.paymentDetail.findUnique({
        where: {
          id,
        },
      });
      //취소결제 카드
      const cpCard = cancelPayment.amountPayment || 0;
      //취소결제 현금
      const cpCash = cancelPayment.depositAmount || 0;
      // 결제 합
      const totalAmount = cpCard + cpCash;
      if (refundApproval) {
        await client.studentPayment.update({
          where: {
            id: studentPaymentId,
          },
          data: {
            cardAmount: cspCard - cpCard,
            cashAmount: cspCash - cpCash,
            unCollectedAmount: cspUnCollectedAmount + totalAmount,
          },
        });
        //데이터 변경 (reqRefund, reqRefundManager)
        //알람전송
        const personalTargetArr = [];
        personalTargetArr.push(existingId?.reqRefundManagerId);
        //console.log(personalTargetArr)
        const createAlarm = await client.alarm.create({
          data: {
            title: "환불승인완료",
            content: `${user?.mUsername}(${user?.mUserId})님이 환불승인완료 하였습니다.`,
            personalTarget: personalTargetArr,
            branchId: user?.branchId,
          },
        });
        if (!createAlarm) {
          throw new Error(
            "환불승인완료에 대한 알람이 정상적으로 생성되지 않았습니다.",
          );
        }
      }

      return {
        ok: true,
        message: "환불승인완료.",
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "에러발생! 에러메세지 확인",
        error: `Error:${error.message}`,
      };
    }
  }
}
