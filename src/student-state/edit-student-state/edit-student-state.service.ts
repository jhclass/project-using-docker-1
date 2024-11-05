import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditStudentStateService {
  constructor(private readonly client: PrismaService) {}
  async editStudentStateFunc(
    context: any,
    id: number,
    campus?: string,
    category?: string,
    stName?: string,
    phoneNum1?: string,
    phoneNum2?: string,
    phoneNum3?: string,
    subject?: string[],
    detail?: string,
    progress?: number,
    stEmail?: string,
    stAddr?: string,
    subDiv?: string,
    stVisit?: string,
    expEnrollDate?: string,
    perchase?: boolean,
    birthday?: string,
    pic?: string,
    receiptDiv?: string,
    adviceTypes?: number[],
    lastModifiedTime?: string,
  ) {
    try {
      const { user } = context.req;
      if (!id || !lastModifiedTime) {
        throw new Error("id 와 lastModifiedTime 은 필수값 입니다.");
      }
      const existingData = await this.client.studentState.findUnique({
        where: {
          id: id,
        },
        include: {
          adviceTypes: true,
        },
      });
      if (!existingData) {
        throw new Error("데이터가 존재 하지 않습니다. id를 다시 확인하세요.");
      }
      const existingAdviceTtypeData = existingData.adviceTypes;
      await this.client.studentState.update({
        where: { id: id },
        data: {
          campus,
          stName,
          phoneNum1,
          phoneNum2,
          phoneNum3,
          category,
          subject,
          detail,
          progress,
          stEmail,
          stAddr,
          subDiv,
          stVisit,
          expEnrollDate,
          perchase,
          birthday,
          pic,
          receiptDiv,
          currentManager: {
            connect: { id: user?.id },
          },
          adviceTypes: {
            disconnect: existingAdviceTtypeData.map((type) => ({
              id: type.id,
            })),
            connect: adviceTypes.map((id) => ({ id })),
          },
          lastModifiedTime,
        },
      });

      return {
        ok: true,
        message: "정상적으로 수정 완료 되었습니다.",
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
