import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditStudentService {
  constructor(private readonly client: PrismaService) {}
  async editStudentFunc(
    id: number,
    name?: string,
    phoneNum1?: string,
    phoneNum2?: string,
    smsAgreement?: string,
    birthday?: string,
    lastModifiedTime?: string, //최근수정시간
  ) {
    try {
      if (!id || !lastModifiedTime) {
        throw new BadRequestException(
          "id 와 lastModifiedTime 은 필수값 입니다.",
        );
      }
      const editStudentOk = await this.client.student.update({
        where: {
          id,
        },
        data: {
          name,
          phoneNum1,
          phoneNum2,
          smsAgreement,
          birthday,
          lastModifiedTime,
        },
      });
      if (editStudentOk) {
        return {
          ok: true,
          message: `${name} 학생 정보가 수정되었습니다.`,
        };
      }
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
