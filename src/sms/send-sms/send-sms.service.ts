import { Injectable } from "@nestjs/common";
import * as qs from "qs";
import axios from "axios";
import { PrismaService } from "@src/prisma/prisma.service";
@Injectable()
export class SendSmsService {
  constructor(private readonly client: PrismaService) {}
  async sendSmsFunc(
    context: any,
    receiver: string,
    message: string,
    rDate?: string,
    rTime?: string,
    senderNum?: string,
  ) {
    const data = {
      key: process.env.ALIGO_API_KEY,
      user_id: process.env.ALIGO_USER_ID,
      //인증받지 못한 번호는 작성하면 안됩니다.
      //알리고에서 번호인증을 먼저 하세요
      sender: !senderNum ? process.env.ALIGO_SENDER : senderNum,
      receiver,
      msg: message,
      rdate: rDate,
      rtime: rTime,
      testmode_yn: "N",
    };
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    };
    try {
      const client = this.client;
      const { user } = context.req;
      const response = await axios.post(
        "https://apis.aligo.in/send/",
        qs.stringify(data),
        { headers },
      );
      if (response.data.result_code !== "1") {
        const failureReason = response.data.message || "Unknown reason";
        console.log("실패사유:", failureReason);
        //SMS 발송 기록을 저장
        await client.sms.create({
          data: {
            receiver,
            message,
            manageUserId: user?.id,
            branchId: user?.branchId,
            rDate,
            rTime,
            successType: "N",
            sender: !senderNum ? process.env.ALIGO_SENDER : senderNum,
            failureReason,
          },
        });
        return {
          ok: false,
          message: "메세지 발송실패",
          error: `실패사유:${failureReason}`,
        };

        //throw new Error("SMS 발송 실패");
      }
      //SMS 발송 기록을 저장
      await client.sms.create({
        data: {
          receiver,
          message,
          manageUserId: user?.id,
          branchId: user?.branchId,
          rDate,
          rTime,
          successType: "Y",
          sender: !senderNum ? process.env.ALIGO_SENDER : senderNum,
        },
      });
      return {
        ok: true,
        message: "메세지 발송성공",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "메세지전송실패! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
