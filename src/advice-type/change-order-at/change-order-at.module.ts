import { Module } from "@nestjs/common";
import { ChangeOrderAtResolver } from "./change-order-at.resolver";
import { ChangeOrderAtService } from "./change-order-at.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [ChangeOrderAtResolver, ChangeOrderAtService],
})
export class ChangeOrderAtModule {}
