import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
interface ISearchConditions {
  id?: number;
  mUserId?: string;
  mUsername?: string;
  mGrade?: number;
  mRank?: string;
  mPhoneNum?: string;
  mPart?: {
    hasSome?: string[];
  };
  resign?: string;
  mJoiningDate?: {
    gte?: string;
    lte?: string;
  };
  limit?: number;
  page?: number;
}
@Injectable()
export class SearchManageUserService {
  constructor(private readonly client: PrismaService) {}
  async searchManageUserFunc(
    id?: number,
    mUserId?: string,
    mUsername?: string,
    mGrade?: number,
    mRank?: string,
    mPhoneNum?: string,
    mPart?: string,
    resign?: string,
    mJoiningDate?: string[],
    limit?: number,
    page?: number,
  ) {
    try {
      const pageNum = page ?? 1;
      const take = limit ?? 10;
      // 조건
      const searchConditions = {} as ISearchConditions;
      if (id) {
        searchConditions.id = id;
      }
      if (mUserId) {
        searchConditions.mUserId = mUserId;
      }
      if (mUsername) {
        searchConditions.mUsername = mUsername;
      }
      if (mGrade) {
        searchConditions.mGrade = mGrade;
      }
      if (mRank) {
        searchConditions.mRank = mRank;
      }
      if (mPhoneNum) {
        searchConditions.mPhoneNum = mPhoneNum;
      }
      if (mPart) {
        searchConditions.mPart = {
          hasSome: Array.isArray(mPart) ? mPart : [mPart], // 배열로 변환
        };
      }
      if (resign) {
        searchConditions.resign = resign;
      }
      if (mJoiningDate) {
        searchConditions.mJoiningDate = {
          gte: mJoiningDate[0],
          lte: mJoiningDate[1],
        };
      }
      const [result, totalCount] = await Promise.all([
        this.client.manageUser.findMany({
          where: searchConditions,
          skip: (pageNum - 1) * take,
          take,
          orderBy: {
            createdAt: "desc",
          },
        }),
        this.client.manageUser.count({
          where: searchConditions,
        }),
      ]);

      return {
        ok: true,
        message: `정상적으로 검색 완료 되었습니다.`,
        data: result || [],
        totalCount: totalCount || 0,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        error: `Error:${error.message}`,
        message: `에러발생! 에러메세지를 확인하세요.`,
      };
    }
  }
}
