import { Module } from "@nestjs/common";
import { SalesDataModule } from "./sales-data/sales-data.module";
import { StatisticsModule } from "./statistics/statistics.module";

@Module({
  imports: [SalesDataModule, StatisticsModule],
})
export class SalesModule {}
