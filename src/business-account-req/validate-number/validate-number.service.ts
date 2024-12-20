import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { ValidateNumberDto } from "./dto/validate-number.dto";
import axios from "axios";
import * as qs from "qs";
@Injectable()
export class ValidateNumberService {
  constructor(private readonly client: PrismaService) {}
  async validateNumberFunc(input: ValidateNumberDto) {
    const { phoneNum } = input;
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    const data = {
      key: process.env.ALIGO_API_KEY,
      user_id: process.env.ALIGO_USER_ID,
      //인증받지 못한 번호는 작성하면 안됩니다.
      //알리고에서 번호인증을 먼저 하세요
      sender: process.env.ALIGO_SENDER,
      receiver: phoneNum,
      msg: `[SOLUHERO 문자] 인증번호 [${randomCode}] 를 입력하세요.`,

      testmode_yn: "N",
    };
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    };
    try {
      const response = await axios.post(
        "https://apis.aligo.in/send/",
        qs.stringify(data),
        { headers },
      );
      if (response.data.result_code !== "1") {
        const failureReason = response.data.message || "Unknown reason";
        console.log("실패사유:", failureReason);
        //SMS 발송 기록을 저장

        throw new ServiceUnavailableException(
          "메세지 전송이 실패 하였습니다. 실패사유를 확인하세요.",
        );
      }

      return {
        ok: true,
        message: "메세지 발송성공",
        validateNum: randomCode,
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
