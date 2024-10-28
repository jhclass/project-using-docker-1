import { Module } from "@nestjs/common";
import { StaticPushAtService } from "./static-push-at.service";
import { StaticPushAtResolver } from "./static-push-at.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [StaticPushAtService, StaticPushAtResolver],
})
export class StaticPushAtModule {}
