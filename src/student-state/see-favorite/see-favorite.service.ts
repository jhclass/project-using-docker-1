import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class SeeFavoriteService {
  constructor(private readonly client: PrismaService) {}
  async seeFavoriteFunc(context: any) {
    try {
      const { user } = context.req;
      const selectedNum = await this.client.manageUser.findUnique({
        where: {
          id: user?.id,
        },
      });
      //console.log(selectedNum.favoriteStudentState);
      return this.client.studentState.findMany({
        where: {
          id: {
            in: selectedNum.favoriteStudentState,
          },
        },
        skip: 0,
        take: 5,
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}
