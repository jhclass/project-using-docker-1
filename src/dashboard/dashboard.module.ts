import { Module } from "@nestjs/common";
import { DashboardResolver } from "./dashboard.resolver";
import { DashboardService } from "./dashboard.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DashboardResolver, DashboardService],
})
export class DashboardModule {}
