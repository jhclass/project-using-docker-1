import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class PermissionsGrantedService {
  constructor(private readonly client: PrismaService) {}
  async permissionsGrantedFunc(id: number) {
    return this.client.manageUser.findMany({
      where: {
        PermissionsGranted: {
          some: {
            id,
          },
        },
      },
      orderBy: {
        mUsername: "asc",
      },
    });
  }
}
