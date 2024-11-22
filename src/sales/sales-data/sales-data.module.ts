import { Module } from "@nestjs/common";
import { SalesDataResolver } from "./sales-data.resolver";
import { SalesDataService } from "./sales-data.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SalesDataResolver, SalesDataService],
})
export class SalesDataModule {}
