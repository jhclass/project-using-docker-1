import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class DeleteHopeForEmploymentService {
  constructor(private readonly client: PrismaService) {}
  async deleteHopeForEmploymentFunc(id: number) {
    try {
      // id
      const client = this.client;
      const existingId = await client.hopeForEmployment.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
      await client.hopeForEmployment.delete({
        where: { id },
      });
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
