import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  constructor(private readonly client: PrismaService) {}
  //매월 자정 1일 자정에 실행
  @Cron("0 0 1 * *")
  async deleteOldUserActivityLogs() {
    this.logger.log("Batch job started: Deleting old Records");
    try {
      const threeMonthsAgo = new Date(
        new Date().setMonth(new Date().getMonth() - 3),
      );
      const oneMonthAgo = new Date(
        new Date().setMonth(new Date().getMonth() - 1),
      );

      const delLogsResult = await this.client.userActivityLogs.deleteMany({
        where: {
          createdAt: {
            lt: threeMonthsAgo,
          },
        },
      });

      const delAlarmsResult = await this.client.alarm.deleteMany({
        where: {
          createdAt: {
            lt: oneMonthAgo,
          },
        },
      });

      this.logger.log(`Deleted ${delLogsResult.count} user activity logs.`);
      this.logger.log(`Deleted ${delAlarmsResult.count} alarms.`);
    } catch (error) {
      this.logger.error("Batch job failed:", error.message);
    }
    this.logger.log("Batch job finished.");
  }
}
