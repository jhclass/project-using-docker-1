import { Args, Context, Mutation, Resolver, Int } from "@nestjs/graphql";
import { CreatePaymentDetailService } from "./create-payment-detail.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreatePaymentDetailResolver {
  constructor(private createPaymentDetailService: CreatePaymentDetailService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createPaymentDetail(
    @Context() context: any,
    @Args("cashOrCard")
    cashOrCard: string,
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number, //연결된 학생결제(StudentPayment 의 id)
    @Args("receiverId", { type: () => Int })
    receiverId: number, //수납자 (영업직원)
    @Args("cardCompany", { nullable: true })
    cardCompany?: string,
    @Args("cardNum", { nullable: true }) // 카드회사
    cardNum?: string,
    @Args("installment", { type: () => Int, nullable: true }) //카드번호
    installment?: number, //할부개월
    @Args("ApprovalNum", { nullable: true })
    ApprovalNum?: string, //승인번호
    @Args("amountPayment", { type: () => Int, nullable: true })
    amountPayment?: number, //결제금액
    @Args("paymentDate", { nullable: true })
    paymentDate?: string, //결제일
    // #unpaidPayment: Int, //미수납액
    @Args("bankName", { nullable: true })
    bankName?: string, //은행이름
    @Args("depositorName", { nullable: true })
    depositorName?: string, // 입금자명
    @Args("depositAmount", { type: () => Int, nullable: true })
    depositAmount?: number, //입금금액
    @Args("depositDate", { nullable: true })
    depositDate?: string, //입금일
    @Args("cashReceipts", { type: () => [String], nullable: "itemsAndList" })
    cashReceipts?: string[], //현금영수증여부
  ): Promise<CommonResponse> {
    return this.createPaymentDetailService.createPaymentDetailFunc(
      context,
      cashOrCard,
      studentPaymentId,
      receiverId,
      cardCompany,
      cardNum,
      installment,
      ApprovalNum,
      amountPayment,
      paymentDate,
      bankName,
      depositorName,
      depositAmount,
      depositDate,
      cashReceipts,
    );
  }
}
