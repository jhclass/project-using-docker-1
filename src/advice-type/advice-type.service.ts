import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class AdviceTypeService {
  constructor(private readonly client: PrismaService) {}
  async adviceTypeFunc(id: number) {
    return this.client.studentState.findMany({
      where: {
        adviceTypes: {
          some: { id },
        },
      },
    });
  }
}
