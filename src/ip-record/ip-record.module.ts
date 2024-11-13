import { Module } from "@nestjs/common";
import { CheckingIpRecordModule } from "./checking-ip-record/checking-ip-record.module";

@Module({
  imports: [CheckingIpRecordModule],
})
export class IpRecordModule {}
