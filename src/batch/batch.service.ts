import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "@src/prisma/prisma.service";
import * as fs from "fs";
import { join } from "path";
@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  constructor(private readonly client: PrismaService) {}
  //매월 자정 1일 자정에 실행
  @Cron("0 0 0 1 * *")
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

  @Cron("0 0 0 * * *")
  async deleteTempFiles() {
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);
    const todayTimeStamp = newDate.getTime();
    console.log(typeof todayTimeStamp);
    const tempPath = join(process.cwd(), "temp");
    let files: string[];
    try {
      files = fs.readdirSync(tempPath);
    } catch (error) {
      this.logger.error(`temp 폴더를 읽을 수 없습니다. ${error.message}`);
    }
    console.log(files);

    const deletedFiles: string[] = [];
    files.forEach((file) => {
      const splitFile = file.split("_");
      if (splitFile.length < 2) {
        console.warn(`올바른 파일명이 아니기 때문에 삭제하지 않음.`);
        return;
      }
      const removeExt = splitFile?.[1]?.split(".");
      const fileTimeStamp = Number(removeExt?.[0]);
      if (isNaN(fileTimeStamp)) {
        console.warn(`${file}:잘못된 타임스탬프, 삭제하지 않음.`);
        return;
      }
      if (fileTimeStamp < todayTimeStamp) {
        try {
          fs.unlinkSync(join(tempPath, file));
          deletedFiles.push(file);
        } catch (error) {
          this.logger.error(`${file}:삭제 실패:${error.message}`);
        }
      }
    });
    this.logger.log(`deleted ${deletedFiles.length} temp file(s)`);
  }
}
