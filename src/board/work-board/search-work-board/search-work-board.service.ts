import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { SearchWorkBoardDto } from "./dto/search-work-board.dto";
import { validateIdExists } from "@src/utils/shared.utils";
interface ISearchConditions {
  branchId: number;
  id: number;
  writer: string;
  toTeam: string;
  toPerson: string;
  createdAt: {
    gte: string;
    lte: string;
  };
  workStatus: string;
}
@Injectable()
export class SearchWorkBoardService {
  constructor(private readonly client: PrismaService) {}
  async searchWorkBoardFunc(
    context: any,
    searchWorkBoardDto: SearchWorkBoardDto,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      const {
        id,
        toTeam,
        toPerson,
        writer,
        workPeriod,
        workStatus,
        page,
        limit,
      } = searchWorkBoardDto;
      const pageNum = page || 1;
      const take = limit || 10;

      const searchConditions = { branchId: user.branchId } as ISearchConditions;
      if (id) {
        const existingId = await client.workBoard.findUnique({
          where: {
            id: searchWorkBoardDto.id,
            branchId: user.branchId,
          },
        });
        validateIdExists(existingId);
        searchConditions.id = id;
      }
      if (writer) {
        searchConditions.writer = writer;
      }
      if (toTeam) {
        searchConditions.toTeam = toTeam;
      }
      if (toPerson) {
        searchConditions.toPerson = toPerson;
      }
      if (workPeriod) {
        searchConditions.createdAt = {
          gte: String(workPeriod[0]),
          lte: String(workPeriod[1]),
        };
      }
      if (workStatus) {
        searchConditions.workStatus = workStatus;
      }

      const [data, totalCount] = await Promise.all([
        client.workBoard.findMany({
          where: searchConditions,
          skip: (pageNum - 1) * take,
          take,
          orderBy: {
            id: "desc",
          },
        }),
        client.workBoard.count({
          where: searchConditions,
        }),
      ]);
      return {
        ok: true,
        message: "정상적으로 검색 완료 되었습니다.",
        data: data || [],
        totalCount: totalCount || 0,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        error: `Error:${error}`,
        message: "에러발생! 에러메세지를 확인하세요.",
      };
    }
  }
}
