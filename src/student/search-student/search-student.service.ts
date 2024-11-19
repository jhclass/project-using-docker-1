import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  branchId: number;
  id: number;
  birthday: {
    gte: string;
    lte: string;
  };
  createdAt: {
    gte: string;
    lte: string;
  };
  phoneNum1: {
    contains: string;
    mode: "insensitive";
  };
  name: {
    contains: string;
    mode: "insensitive"; // 대소문자 무시 옵션
  };
}
@Injectable()
export class SearchStudentService {
  constructor(private readonly client: PrismaService) {}
  async searchStudentFunc(
    context: any,
    id?: number,
    studentName?: string,
    createdAt?: string[],
    birthday?: string[],
    phoneNum?: string,
    page?: number,
    limit?: number,
  ) {
    try {
      const { user } = context.req;
      const defaultPageValue = page && page > 0 ? page : 1;
      const perPageValue = limit && limit > 0 ? limit : 10;
      const skipValue = (defaultPageValue - 1) * perPageValue;
      const branchId = user?.branchId;
      const searchConditions = {} as ISearchConditions;
      if (branchId) {
        searchConditions.branchId = branchId;
      }
      if (id) {
        searchConditions.id = id;
      }
      if (birthday) {
        searchConditions.birthday = {
          gte: birthday[0],
          lte: birthday[1],
        };
      }
      if (createdAt) {
        searchConditions.createdAt = {
          gte: createdAt[0],
          lte: createdAt[1],
        };
      }

      if (phoneNum) {
        searchConditions.phoneNum1 = {
          contains: phoneNum,
          mode: "insensitive", // 대소문자 무시 옵션
        };
      }
      if (studentName) {
        searchConditions.name = {
          contains: studentName,
          mode: "insensitive", // 대소문자 무시 옵션
        };
      }
      console.log(searchConditions);
      const [searchOk, searchCount] = await Promise.all([
        await this.client.student.findMany({
          where: searchConditions,
          skip: skipValue,
          take: perPageValue,
          orderBy: {
            id: "desc",
          },
        }),
        await this.client.student.count({
          where: searchConditions,
        }),
      ]);

      return {
        ok: true,
        message: "검색 완료 되었습니다.",
        student: searchOk,
        totalCount: searchCount,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
