import { Module } from "@nestjs/common";
import { RefundResolver } from "./refund.resolver";
import { RefundService } from "./refund.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [RefundResolver, RefundService],
})
export class RefundModule {}
