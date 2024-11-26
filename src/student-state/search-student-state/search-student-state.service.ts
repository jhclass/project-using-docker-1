import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  branchId?: number;
  id?: number;
  receiptDiv?: string;
  subDiv?: string;
  pic?: string;
  createdAt?: {
    gte: string;
    lte: string;
  };
  stVisit?: {
    gte: string;
    lte: string;
  };
  progress?: {
    in: number[];
  };
  phoneNum1?: {
    contains: string;
    mode: "insensitive";
  };
  stName?: {
    contains: string;
    mode: "insensitive";
  };
  adviceTypes?: {
    some: {
      type: {
        contains: string;
        mode: "insensitive";
      };
    };
  };
}
@Injectable()
export class SearchStudentStateService {
  constructor(private readonly client: PrismaService) {}
  async searchcStudentStateFunc(
    context: any,
    id?: number,
    receiptDiv?: string,
    phoneNum1?: string,
    subDiv?: string,
    pic?: string,
    createdAt?: string[],
    stVisit?: string[],
    stName?: string,
    adviceType?: string,
    progress?: number[],
    page?: number,
    perPage?: number,
  ) {
    try {
      const { user } = context.req;
      const defaultPageValue = page && page > 0 ? page : 1;
      const perPageValue = perPage && perPage > 0 ? perPage : 10;
      const skipValue = (defaultPageValue - 1) * perPageValue;
      const branchId = user?.branchId;
      const searchConditions = {} as ISearchConditions;

      if (branchId) {
        searchConditions.branchId = branchId;
      }
      if (id) {
        searchConditions.id = id;
      }
      if (receiptDiv) {
        searchConditions.receiptDiv = receiptDiv;
      }
      if (subDiv) {
        searchConditions.subDiv = subDiv;
      }
      if (pic) {
        searchConditions.pic = pic;
      }
      if (createdAt) {
        searchConditions.createdAt = {
          gte: createdAt[0],
          lte: createdAt[1],
        };
      }
      if (stVisit) {
        searchConditions.stVisit = {
          gte: stVisit[0],
          lte: stVisit[1],
        };
      }
      if (progress) {
        searchConditions.progress = {
          in: progress,
        };
      }
      if (phoneNum1) {
        searchConditions.phoneNum1 = {
          contains: phoneNum1,
          mode: "insensitive", // 대소문자 무시 옵션
        };
      }
      if (stName) {
        searchConditions.stName = {
          contains: stName,
          mode: "insensitive", // 대소문자 무시 옵션
        };
      }
      if (adviceType) {
        searchConditions.adviceTypes = {
          some: {
            type: {
              contains: adviceType,
              mode: "insensitive", // 대소문자 무시 옵션
            },
          },
        };
      }
      console.log(searchConditions);
      const [searchOk, totalCount] = await Promise.all([
        await this.client.studentState.findMany({
          where: searchConditions,
          skip: skipValue,
          take: perPageValue,
          orderBy: {
            id: "desc",
          },
          include: {
            ConsultationMemo: true,
            adviceTypes: true,
          },
        }),
        await this.client.studentState.count({ where: searchConditions }),
      ]);

      console.log(searchOk);
      if (searchOk) {
        return {
          ok: true,
          message: "정상적으로 검색 완료 되었습니다.",
          studentState: searchOk || [],
          totalCount,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
