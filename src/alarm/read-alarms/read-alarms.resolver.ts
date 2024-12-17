import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { ReadAlarmsService } from "./read-alarms.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class ReadAlarmsResolver {
  constructor(private readonly readAlarmsService: ReadAlarmsService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async readAlarms(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true }) id: number,
    @Args("all", { nullable: true }) all: string,
  ) {
    return this.readAlarmsService.readAlarmsFunc(context, id, all);
  }
}
