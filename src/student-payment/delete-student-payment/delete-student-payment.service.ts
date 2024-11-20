import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class DeleteStudentPaymentService {
  constructor(private readonly client: PrismaService) {}
  async deleteStudentPaymentFunc(id: number) {
    try {
      await this.client.studentPayment.findUnique({
        where: {
          id,
        },
      });
      await this.client.studentPayment.delete({
        where: { id },
      });
      return {
        ok: true,
        message: `${id} 번 StudentPayment 데이터가 삭제 되었습니다.`,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "해당 데이터가 삭제 되지 않습니다",
        error: `Error:${error.message}`,
      };
    }
  }
}
