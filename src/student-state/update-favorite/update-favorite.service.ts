import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class UpdateFavoriteService {
  constructor(private readonly client: PrismaService) {}
  async updateFavoriteFunc(context: any, id: number) {
    try {
      // const favoriteState = await client.studentState.update({
      //   where: { id },
      //   data: {
      //     favorite,
      //   },
      // });
      const { user } = context.req;
      const existingItem = await this.client.manageUser.findFirst({
        where: {
          id: user?.id,
        },
      });
      //console.log(existingItem.favoriteStudentState);
      const currentFavoriteList = existingItem.favoriteStudentState;
      const updatedFavoriteList = currentFavoriteList.filter(
        (item) => item !== id,
      );
      //console.log(updatedFavoriteList);
      if (!existingItem.favoriteStudentState.includes(id)) {
        const updateFavoriteStudentState = await this.client.manageUser.update({
          where: { id: user?.id },
          data: {
            favoriteStudentState: {
              push: id,
            },
          },
        });
        return {
          ok: true,
          message: "200 OK",

          favoriteStudentState: updateFavoriteStudentState,
        };
      } else {
        const deleteFavoriteStudent = await this.client.manageUser.update({
          where: { id: user?.id },
          data: {
            favoriteStudentState: {
              set: updatedFavoriteList,
            },
          },
        });
        return {
          ok: true,
          message: "200 OK",
          favoriteStudentState: deleteFavoriteStudent,
        };
      }

      // const totalCount = await client.studentState.count({
      //   where: { favorite: true },
      // });
      //console.log(ManageUserfavoriteList);
      //console.log(favoriteState);
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: `404 Not Found`,
        error: `Error:${error.message}`,
      };
    }
  }
}
