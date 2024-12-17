import { Args, Query, Resolver, Context } from "@nestjs/graphql";
import { DashboardService } from "./dashboard.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import {
  DashboardATResult,
  DashboardMonthResult,
  DashboardRDResult,
  DashboardTodayResult,
  DashboardUnpResult,
} from "@src/dashboard/entity/dashboard.entity";
@Resolver()
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => DashboardTodayResult)
  async dashboardToday(
    @Context() context: any,
    @Args("today", { type: () => [String], nullable: "itemsAndList" })
    today?: string[],
    @Args("yesterday", { type: () => [String], nullable: "itemsAndList" })
    yesterday?: string[],
  ): Promise<DashboardTodayResult> {
    return this.dashboardService.dashboardTodayFunc(context, today, yesterday);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => DashboardMonthResult)
  async dashboardMonth(@Context() context: any): Promise<DashboardMonthResult> {
    return this.dashboardService.dashboardMonthFunc(context);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => DashboardUnpResult)
  async dashboardUnp(@Context() context: any): Promise<DashboardUnpResult> {
    return this.dashboardService.dashboardUnpFunc(context);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => DashboardATResult)
  async dashboardAT(
    @Context() context: any,
    @Args("period", { type: () => [String], nullable: "itemsAndList" })
    period?: string[],
  ): Promise<DashboardATResult> {
    return this.dashboardService.dashboardATFunc(context, period);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [DashboardRDResult], { nullable: "itemsAndList" })
  async dashboardRD(
    @Context() context: any,
    @Args("period", { type: () => [String], nullable: "itemsAndList" })
    period: string[],
  ): Promise<DashboardRDResult[]> {
    return this.dashboardService.dashboardRDFunc(context, period);
  }
}
