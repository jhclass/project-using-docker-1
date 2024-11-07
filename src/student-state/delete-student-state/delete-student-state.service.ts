import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class DeleteStudentStateService {
  constructor(private readonly client: PrismaService) {}
  async deleteStudentStateFunc(context: any, id: number[]) {
    try {
      const { user } = context.req;
      //현재 회원 등급
      const managerOk = await this.client.manageUser.findUnique({
        where: {
          id: user?.id,
        },
      });
      console.log(managerOk.mGrade);
      if (managerOk.mGrade <= 1) {
        //console.log("ok!");
        //실행
        await this.client.studentState.deleteMany({
          where: {
            id: {
              in: id,
            },
          },
        });

        return {
          ok: true,
          message: "정상적으로 삭제에 성공하였습니다.",
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
