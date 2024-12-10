import { Args, Context, Resolver, Mutation } from "@nestjs/graphql";
import { SendSmsService } from "./send-sms.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class SendSmsResolver {
  constructor(private readonly sendSmsService: SendSmsService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async sendSms(
    @Context() context: any,
    @Args("receiver")
    receiver: string,
    @Args("message")
    message: string,
    @Args("rDate", { nullable: true })
    rDate?: string, //예약일
    @Args("rTime", { nullable: true })
    rTime?: string, //예약시간
    @Args("senderNum", { nullable: true })
    senderNum?: string, //발신자 번호 없을경우 대표번호
  ): Promise<CommonResponse> {
    return this.sendSmsService.sendSmsFunc(
      context,
      receiver,
      message,
      rDate,
      rTime,
      senderNum,
    );
  }
}
