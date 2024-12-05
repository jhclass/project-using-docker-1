import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class DeleteEmploymentRecommendationService {
  constructor(private readonly client: PrismaService) {}
  async deleteEmploymentRecommendationFunc(id: number) {
    try {
      //
      if (!id) {
        throw new Error("id 는 필수값 입니다.");
      }
      const client = this.client;
      const existingId = await client.employmentRecommendation.findUnique({
        where: { id },
      });
      validateIdExists(existingId);
      await client.employmentRecommendation.delete({
        where: { id },
      });
      return {
        ok: true,
        message: "정상적으로 삭제 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
