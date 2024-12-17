import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { SalesDataService } from "./sales-data.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { HourlySalesData } from "../entity/hourlyData.entity";

@Resolver()
export class SalesDataResolver {
  constructor(private readonly salesDataService: SalesDataService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => HourlySalesData)
  async getHourlySalesData(
    @Context() context: any,
    @Args("date", { type: () => [String], nullable: "items" }) date?: string[],
  ) {
    return this.salesDataService.getHourlySalesDataFunc(context, date);
  }
}
