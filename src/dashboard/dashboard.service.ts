import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private readonly client: PrismaService) {}
  //dashboardTodayFunc
  async dashboardTodayFunc(
    context: any,
    today?: string[],
    yesterday?: string[],
  ) {
    try {
      const { user } = context.req;
      //오늘 신규 숫자

      const todayStudent = await this.client.studentState.count({
        where: {
          branchId: user?.branchId,
          createdAt: {
            gte: today[0],
            lt: today[1],
          },
        },
      });
      //전날 신규 숫자와 비교

      const yesterdayStudent = await this.client.studentState.count({
        where: {
          branchId: context.loggedInManager?.branchId,
          createdAt: {
            gte: yesterday[0],
            lt: yesterday[1],
          },
        },
      });
      return {
        ok: true,
        message: "정상적으로 조회 완료 되었습니다.",
        today: todayStudent,
        compareToday: todayStudent - yesterdayStudent,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
  //dashboardMonthFunc
  async dashboardMonthFunc(context: any) {
    try {
      const { user } = context.req;
      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      const lastMonthFirstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1,
      );
      const lastMonthLastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0,
      );
      const thisMonthStudent = await this.client.studentState.count({
        where: {
          branchId: user?.branchId,
          createdAt: {
            gte: firstDayOfMonth,
            lte: currentDate,
          },
        },
      });
      const lastMonthStudent = await this.client.studentState.count({
        where: {
          branchId: user?.branchId,
          createdAt: {
            gte: lastMonthFirstDay,
            lte: lastMonthLastDay,
          },
        },
      });
      //console.log(thisMonthStudent);
      return {
        ok: true,
        message: "정상적으로 조회완료 되었습니다.",
        month: thisMonthStudent,
        compareMonth: thisMonthStudent - lastMonthStudent,
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
  //dashboardUnpFunc
  async dashboardUnpFunc(context: any) {
    try {
      const { user } = context.req;
      const unpCount = await this.client.studentState.count({
        where: {
          branchId: user?.branchId,
          progress: 999,
        },
      });
      if (unpCount) {
        return {
          ok: true,
          unpCount,
        };
      } else {
        return {
          ok: false,
          unpCount,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
  //dashboardAT
  async dashboardATFunc(context: any, period?: string[]) {
    try {
      const { user } = context.req;
      // context에서 branchId를 가져옴
      const branchId = user?.branchId;

      // 기간을 디버깅 출력
      //console.log("Period:", period);
      //console.log("BranchId:", branchId);

      // adviceType 별로 StudentState 개수를 조회
      const typeWithCounts = await this.client.adviceType.findMany({
        where: {
          category: "상담분야", // 상담분야 카테고리 확인
          studentStates: {
            some: {
              createdAt: {
                gte: new Date(period[0]), // 시작 날짜
                lte: new Date(period[1]), // 종료 날짜
              },
              branchId: branchId, // 동일한 브랜치 ID 확인
            },
          },
        },
        select: {
          type: true,
          studentStates: {
            where: {
              createdAt: {
                gte: new Date(period[0]), // 시작 날짜
                lte: new Date(period[1]), // 종료 날짜
              },
              branchId: branchId, // 동일한 브랜치 ID 확인
            },
            select: {
              id: true,
            },
          },
        },
      });

      // 쿼리 결과 출력
      //console.log("상담분야(대시보드):", typeWithCounts);

      // 데이터 변환 및 정렬
      const sortedTypes = typeWithCounts
        .map((type) => ({
          typeName: type.type,
          count: type.studentStates.length, // studentStates 배열의 길이를 사용하여 개수 계산
        }))
        .sort((a, b) => b.count - a.count);

      //console.log("Sorted Types:", sortedTypes); // 정렬 결과 출력

      // 상위 5개 항목 추출
      const topfivetypes = sortedTypes.slice(0, 5);

      // 전체 학생 상태 개수 조회
      const totalStudentState = await this.client.studentState.count({
        where: {
          createdAt: {
            gte: new Date(period[0]), // 시작 날짜
            lte: new Date(period[1]), // 종료 날짜
          },
          branchId: branchId,
        },
      });

      // 결과를 구조화하여 반환
      const dashboardATResult = {
        topFiveName: topfivetypes.map((t) => t.typeName),
        count: topfivetypes.map((t) => t.count),
        totalStudentState,
      };

      return dashboardATResult;
    } catch (error) {
      console.error("Error in dashboardAT:", error.message);
      // 에러 발생 시 기본값 반환
      return {
        topFiveName: [],
        count: [],
        totalStudentState: 0,
        message: "데이터를 가져오는 중 오류가 발생했습니다.",
        error: `Error:${error.message}`,
      };
    }
  }
  //
  async dashboardRDFunc(context: any, period?: string[]) {
    //
    try {
      const { user } = context.req;
      const branchId = user?.branchId;
      // 기간을 `timestamp`로 변환하여 쿼리에 사용
      const startDate = period[0];
      const endDate = period[1];
      // postgreSQL 에서는 따옴표("") 없으면 소문자로만 인식한다는 점. 주의.
      const rdName = await this.client.$queryRaw<IRdname[]>`
      SELECT "receiptDiv" ,COUNT(*) as count
      FROM "StudentState"
      WHERE "branchId" = ${branchId}
      AND "createdAt" BETWEEN to_timestamp(${startDate}::text, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AND to_timestamp(${endDate}::text, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
      GROUP BY "receiptDiv"
      `;
      console.log("dashboardRD(상담접수구분)데이터:", rdName);
      return rdName.map((row) => ({
        receiptDiv: row.receiptDiv,
        count: parseInt(row.count, 10),
      }));
    } catch (error) {
      console.error(error.message);
    }
  }
}
interface IRdname {
  receiptDiv: string;
  count: string; // PostgreSQL에서 반환된 값이 문자열일 수 있음
}
