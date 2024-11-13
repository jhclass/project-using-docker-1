import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { CheckingIpRecordService } from "./checking-ip-record.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class CheckingIpRecordResolver {
  constructor(
    private readonly checkingIpRecordService: CheckingIpRecordService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async checkingIpRecord(
    @Context() context: any,
    @Args("ipRecord") ipRecord: string,
    @Args("today", { type: () => [String], nullable: "items" }) today: string[],
  ) {
    return this.checkingIpRecordService.checkingIpRecordFunc(
      context,
      ipRecord,
      today,
    );
  }
}
