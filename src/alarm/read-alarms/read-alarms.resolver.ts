import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { ReadAlarmsService } from "./read-alarms.service";

@Resolver()
export class ReadAlarmsResolver {
  constructor(private readonly readAlarmsService: ReadAlarmsService) {}
  @Mutation(() => CommonResponse)
  async readAlarms(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true }) id: number,
    @Args("all", { nullable: true }) all: string,
  ) {
    return this.readAlarmsService.readAlarmsFunc(context, id, all);
  }
}
