import { Resolver, Query, Args, Int, Context } from "@nestjs/graphql";
import { ResultSeeAlarms } from "@src/result-dto/common-response.dto";
import { SeeAlarmsService } from "./see-alarms.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class SeeAlarmsResolver {
  constructor(private readonly seeAlarmsService: SeeAlarmsService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultSeeAlarms)
  async seeAlarms(
    @Context() context: any,
    @Args("limit", { type: () => Int, nullable: true }) limit: number,
    @Args("page", { type: () => Int, nullable: true }) page: number,
  ): Promise<ResultSeeAlarms> {
    return this.seeAlarmsService.seeAlarmsFunc(context, limit, page);
  }
}
