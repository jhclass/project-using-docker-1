import { Args, Context, Resolver, Int, Mutation } from "@nestjs/graphql";
import { EditPaymentDetailService } from "./edit-payment-detail.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/common-entity/common-response.entity";
@Resolver()
export class EditPaymentDetailResolver {
  constructor(
    private readonly editPaymentDetailService: EditPaymentDetailService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editPaymentDetail(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("cashOrCard")
    cashOrCard: string,
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number, //연결된 학생결제(StudentPayment 의 id)
    @Args("receiverId", { type: () => Int })
    receiverId: number,
    @Args("lastModifiedTime")
    lastModifiedTime: string, //최근수정시간
    @Args("cardCompany", { nullable: true })
    cardCompany?: string, // 카드회사
    @Args("cardNum", { nullable: true })
    cardNum?: string, //카드번호
    @Args("installment", { type: () => Int, nullable: true })
    installment?: number, //할부개월
    @Args("ApprovalNum", { nullable: true })
    ApprovalNum?: string, //승인번호
    @Args("amountPayment", { type: () => Int, nullable: true })
    amountPayment?: number, //결제금액
    @Args("paymentDate", { nullable: true })
    paymentDate?: string, //결제일
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
    return this.editPaymentDetailService.editPaymentDetailFunc(
      context,
      id,
      cashOrCard,
      studentPaymentId,
      receiverId,
      lastModifiedTime,
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
