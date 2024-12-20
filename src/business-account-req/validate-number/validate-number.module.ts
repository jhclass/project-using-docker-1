import { Module } from "@nestjs/common";
import { ValidateNumberResolver } from "./validate-number.resolver";
import { ValidateNumberService } from "./validate-number.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [ValidateNumberResolver, ValidateNumberService],
})
export class ValidateNumberModule {}
