import { Module } from "@nestjs/common";
import { SendSmsResolver } from "./send-sms.resolver";
import { SendSmsService } from "./send-sms.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SendSmsResolver, SendSmsService],
})
export class SendSmsModule {}
