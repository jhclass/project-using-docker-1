import { Args, Mutation, Resolver, Int, Context } from "@nestjs/graphql";
import { EditStudentPaymentService } from "./edit-student-payment.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class EditStudentPaymentResolver {
  constructor(
    private readonly editStudentPaymentService: EditStudentPaymentService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editStudentPayment(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("subjectId", { type: () => Int }) //수강담당자. manageUserID 선택해서 입력할것.
    subjectId: number,
    @Args("campus", { nullable: true })
    campus?: string,
    @Args("seScore", { type: () => Int, nullable: true }) //기본값 '신촌'
    seScore?: number,
    @Args("subject", { nullable: true })
    subject?: string,
    @Args("tuitionFee", { type: () => Int, nullable: true }) //subject 선택하게 해서 받아야함. campus 와 subject 는 student에 저장.
    tuitionFee?: number,
    @Args("discountAmount", { nullable: true })
    discountAmount?: string,
    @Args("cashAmount", { type: () => Int, nullable: true })
    cashAmount?: number,
    @Args("cardAmount", { type: () => Int, nullable: true })
    cardAmount?: number,
    @Args("actualAmount", { type: () => Int, nullable: true })
    actualAmount?: number,
    @Args("unCollectedAmount", { type: () => Int, nullable: true })
    unCollectedAmount?: number,
    @Args("receiptClassification", {
      type: () => [String],
      nullable: "itemsAndList",
    })
    receiptClassification?: string[],
    @Args("paymentDate", { nullable: true }) //영수증구분 (현금영수증,이니시스,자체영수증 등)
    paymentDate?: string,
    @Args("processingManagerId", { type: () => Int, nullable: true }) //변경은 회계담당자(master)만 가능.
    processingManagerId?: number,
    @Args("situationReport", { nullable: true })
    situationReport?: boolean,
    @Args("amountReceived", { type: () => Int, nullable: true })
    amountReceived?: number,
    @Args("subDiv", { nullable: true })
    subDiv?: string,
    @Args("courseComplete", { nullable: true })
    courseComplete?: string,
    @Args("employment", { nullable: true })
    employment?: string,
    @Args("dueDate", { nullable: true })
    dueDate?: string,
    @Args("classCode", { nullable: true })
    classCode?: string,
    @Args("lectureAssignment", { nullable: true })
    lectureAssignment?: string,
    @Args("isWeekend", { nullable: true })
    isWeekend?: string,
    @Args("mZipCode", { nullable: true }) //주말여부 주말강의 수강료의 20% 만큼 가산된 금액으로 적용
    mZipCode?: string,
    @Args("mAddresses", { nullable: true })
    mAddresses?: string,
    @Args("mAddressDetail", { nullable: true })
    mAddressDetail?: string,
    @Args("supportType", { nullable: true })
    supportType?: string,
    @Args("lastModifiedTime", { nullable: true })
    lastModifiedTime?: string, //최근수정시간
  ): Promise<CommonResponse> {
    return this.editStudentPaymentService.editStudentPaymentFunc(
      context,
      id,
      subjectId,
      campus,
      seScore,
      subject,
      tuitionFee,
      discountAmount,
      cashAmount,
      cardAmount,
      actualAmount,
      unCollectedAmount,
      receiptClassification,
      paymentDate,
      processingManagerId,
      situationReport,
      amountReceived,
      subDiv,
      courseComplete,
      employment,
      dueDate,
      classCode,
      lectureAssignment,
      isWeekend,
      mZipCode,
      mAddresses,
      mAddressDetail,
      supportType,
      lastModifiedTime,
    );
  }
}
