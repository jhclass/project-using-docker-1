import { Resolver, Mutation, Int, Context, Args } from "@nestjs/graphql";
import { StatisticsService } from "./statistics.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { SalesStatisticsResult } from "@src/sales/statistics/entity/statistics.entity";

@Resolver()
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => SalesStatisticsResult)
  async salesStatistics(
    @Context() context: any,
    @Args("period", { type: () => [String], nullable: "items" })
    period?: string[],
    @Args("receiverId", { type: () => [Int], nullable: "items" })
    receiverId?: number[],
  ): Promise<SalesStatisticsResult> {
    return this.statisticsService.salesStatisticsFunc(
      context,
      period,
      receiverId,
    );
  }
}
