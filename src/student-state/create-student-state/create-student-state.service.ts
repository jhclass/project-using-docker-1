import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateStudentStateService {
  constructor(private readonly client: PrismaService) {}
  async createStudentStateFunc(
    context: any,
    agreement: string,
    subject: string[],
    progress: number,
    stName: string,
    phoneNum1: string,
    campus?: string,
    detail?: string,
    category?: string,
    phoneNum2?: string,
    phoneNum3?: string,
    stEmail?: string,
    stAddr?: string,
    stVisit?: string,
    subDiv?: string,
    expEnrollDate?: string,
    perchase?: boolean,
    birthday?: string,
    receiptDiv?: string,
    pic?: string,
    classMethod?: string[],
    branchId?: number,
    //today?: string[],
  ) {
    try {
      const { user } = context.req;
      //const { ip } = context.req;
      //console.log("a", ip);
      //권한 -> 분야관리 -> 소켓 -> 다시 상담관리 -> 상담 메모 순으로 작업.
      const classMethods = classMethod === null ? [] : classMethod;

      await this.client.studentState.create({
        data: {
          agreement,
          subject,
          progress,
          stName,
          phoneNum1,
          campus,
          detail,
          category,
          phoneNum2,
          phoneNum3,
          stEmail,
          stAddr,
          stVisit,
          subDiv,
          expEnrollDate,
          perchase,
          birthday,
          receiptDiv,
          pic,
          classMethod: classMethods,
          branchId: user?.branchId || branchId,
        },
      });

      //알람등록,
      //소켓발송

      return {
        ok: true,
        message: `정상적으로 등록 완료 되었습니다.`,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
