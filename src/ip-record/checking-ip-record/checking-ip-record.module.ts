import { Module } from "@nestjs/common";
import { CheckingIpRecordService } from "./checking-ip-record.service";
import { CheckingIpRecordResolver } from "./checking-ip-record.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CheckingIpRecordService, CheckingIpRecordResolver],
})
export class CheckingIpRecordModule {}
