import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateStudentStateService {
  constructor(private readonly client: PrismaService) {}
  async createStudentStateFunc(
    context: any,
    agreement: string,

    progress: number,
    adviceTypes: number[],
    subject: string[],
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

    today?: string[],
  ) {
    try {
      const { user } = context.req;
      //const { ip } = context.req;
      //console.log("a", ip);
      //today 체크
      if (!Array.isArray(today) || today.length < 2) {
        throw new Error("오늘 날짜 범위를 정의하는 배열이 필요합니다.");
      }
      //현재 ipRecord 없음.
      const ipAddr =
        context?.req?.headers?.["x-forwarded-for"]?.split(",")[0] || // 프록시를 통해 전달된 실제 클라이언트 IP
        context?.req?.connection?.remoteAddress || // 네트워크 소켓에서 직접 추출한 IP
        "Unknown";
      console.log("context?", context.req);
      console.log(ipAddr);
      //today 체크
      if (!Array.isArray(today) || today.length < 2) {
        throw new Error("오늘 날짜 범위를 정의하는 배열이 필요합니다.");
      }
      //ip 체크 / 내부인원은
      if (!user) {
        if (ipAddr) {
          const checkingIp = await this.client.ipRecord.count({
            where: {
              ipRecord: ipAddr,
              createdAt: {
                gte: today[0],
                lte: today[1],
              },
            },
          });
          if (checkingIp >= 10) {
            throw new Error(
              "오늘 하루 동안 비정상적으로 많은 게시물이 생성된 ip addr 입니다.",
            );
          }
          // ip log 기록 쌓기.

          await this.client.ipRecord.create({
            data: {
              ipRecord: ipAddr,
              allowed: "Y",
              details: "상담 문의 등록",
              branchId: user?.branchId || branchId,
            },
          });
        } else {
          throw new Error(" ip 주소를 기록할 수 없습니다.");
        }
      }

      const branchName = await this.client.branch.findUnique({
        where: {
          id: user?.branchId,
        },
        select: {
          branchName: true,
        },
      });
      //console.log(branchName);
      const classMethods = classMethod === null ? [] : classMethod;
      //console.log(user.branchId);
      await this.client.studentState.create({
        data: {
          agreement,
          subject,
          progress,
          stName,
          phoneNum1,
          campus: campus ?? branchName?.branchName,
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
          branchId: branchId ?? user?.branchId,
          adviceTypes: {
            connect: adviceTypes.map((id) => ({ id })),
          },
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
