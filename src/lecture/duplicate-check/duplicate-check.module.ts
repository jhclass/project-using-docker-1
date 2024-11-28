import { Module } from "@nestjs/common";
import { DuplicateCheckResolver } from "./duplicate-check.resolver";
import { DuplicateCheckService } from "./duplicate-check.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DuplicateCheckResolver, DuplicateCheckService],
})
export class DuplicateCheckModule {}
