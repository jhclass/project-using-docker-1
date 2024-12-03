import { Module } from "@nestjs/common";
import { SignWorkLogsResolver } from "./sign-work-logs.resolver";
import { SignWorkLogsService } from "./sign-work-logs.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SignWorkLogsResolver, SignWorkLogsService],
})
export class SignWorkLogsModule {}
