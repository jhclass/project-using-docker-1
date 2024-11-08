import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class DeleteSubjectService {
  constructor(private readonly client: PrismaService) {}
  async deleteSubjectFunc(id: number) {
    try {
      const okSubject = await this.client.subject.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          subjectName: true,
        },
      });
      //console.log("subjectName",okSubject)
      if (okSubject) {
        await this.client.subject.delete({
          where: { id },
        });
        return {
          ok: true,
          message: `ID:${okSubject.id}, '${okSubject.subjectName}'과정이 삭제 되었습니다.`,
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
