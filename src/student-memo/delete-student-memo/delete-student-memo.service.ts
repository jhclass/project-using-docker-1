import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class DeleteStudentMemoService {
  constructor(private readonly client: PrismaService) {}
  async deleteStudentMemoFunc(id: number) {
    try {
      const client = this.client;
      //존재?
      const existingId = await client.studentMemo.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
      //console.log(existing);
      await client.studentMemo.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
        message: "정상적으로 데이터가 삭제 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message:
          "에러발생! 정상적으로 데이터가 삭제되지 않습니다. 에러메세지를 확인하세요",
        error: `Error: ${error.message}`,
      };
    }
  }
}
