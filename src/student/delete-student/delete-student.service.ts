import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class DeleteStudentService {
  constructor(private readonly client: PrismaService) {}
  async deleteStudentFunc(context: any, id: number) {
    try {
      const { user } = context.req;
      //개발자체크
      const areUdev = await this.client.manageUser.findUnique({
        where: {
          id: user.id,
        },
      });
      if (areUdev.mGrade !== 0) {
        throw new ForbiddenException(
          "당신은 개발자가 아닙니다.개발자만 삭제권한이 있습니다.",
        );
      }
      const existingId = await this.client.student.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
      const deleteStudentOk = await this.client.student.delete({
        where: {
          id,
        },
      });
      if (!deleteStudentOk) {
        throw new InternalServerErrorException(
          "정상적으로 데이터 삭제가 이루어지지 않았습니다.",
        );
      }
      return {
        ok: true,
        message: `student 테이블의 id: ${id} 번이 정상적으로 데이터가 삭제 되었습니다.`,
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
