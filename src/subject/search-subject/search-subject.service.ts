import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  branchId: number;
  id?: number;
  subDiv?: string;
  exposure: boolean;
  subjectName?: {
    contains: string;
    mode: "insensitive"; // 대소문자 무시 옵션
  };
  subjectCode: string;
}
@Injectable()
export class SearchSubjectService {
  constructor(private readonly client: PrismaService) {}
  async searchSubjectFunc(
    context: any,
    id?: number,
    subDiv?: string,
    subjectName?: string,
    subjectCode?: string,
    exposure?: boolean,
    page?: number,
    limit?: number,
  ) {
    try {
      const { user } = context.req;
      const pageInt = page || 1;
      const limitInt = limit || 100;
      const defaultPageValue = pageInt && pageInt > 0 ? pageInt : 1;
      const perPageValue = limitInt && limitInt > 0 ? limitInt : 100;
      const skipValue = (defaultPageValue - 1) * perPageValue;
      const branchId = user?.branchId;
      const searchConditions = {} as ISearchConditions;
      if (branchId) {
        searchConditions.branchId = branchId;
      }
      if (id) {
        searchConditions.id = id;
      }
      if (subDiv) {
        searchConditions.subDiv = subDiv;
      }
      if (subjectName) {
        searchConditions.subjectName = {
          contains: subjectName,
          mode: "insensitive", // 대소문자 무시 옵션
        };
      }
      if (exposure !== undefined && exposure !== null) {
        searchConditions.exposure = exposure;
      }
      if (subjectCode) {
        searchConditions.subjectCode = subjectCode;
      }
      const [searchSubjectOk, totalCount] = await Promise.all([
        await this.client.subject.findMany({
          where: searchConditions,
          skip: skipValue,
          take: perPageValue,
          orderBy: {
            id: "desc",
          },
          include: {
            lectures: true,
          },
        }),
        await this.client.subject.count({ where: searchConditions }),
      ]);

      return {
        ok: true,
        message: "데이터검색이 완료되었습니다.",
        totalCount: totalCount || 0,
        result: searchSubjectOk || [],
      };
    } catch (error) {
      console.log(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
