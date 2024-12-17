import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { CreateStudentPaymentService } from "./create-student-payment.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateStudentPaymentResolver {
  constructor(
    private readonly createStudentPaymentService: CreateStudentPaymentService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createStudentPayment(
    @Context() context: any,
    @Args("campus")
    campus: string, //기본값 '신촌'
    @Args("tuitionFee", { type: () => Int })
    tuitionFee: number,
    @Args("studentId", { type: () => Int })
    studentId: number,
    @Args("processingManagerId", { type: () => Int })
    processingManagerId: number, //수강담당자. manageUserID 선택해서 입력할것.
    @Args("subjectId", { type: () => Int })
    subjectId: number,
    @Args("seScore", { type: () => Int, nullable: true })
    seScore?: number,
    @Args("discountAmount", { nullable: true })
    discountAmount?: string,
    @Args("cashAmount", { nullable: true })
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
    receiptClassification?: string[], //영수증구분 (현금영수증,이니시스,자체영수증 등)
    @Args("paymentDate", { nullable: true })
    paymentDate?: string, //변경은 회계담당자(master)만 가능.
    @Args("situationReport", { nullable: true })
    situationReport?: boolean,
    @Args("amountReceived", { type: () => Int, nullable: true })
    amountReceived?: number, //수납액
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
    @Args("supportType", { nullable: true })
    supportType?: string,
  ) {
    return this.createStudentPaymentService.createStudentPaymentFunc(
      context,
      campus,
      tuitionFee,
      studentId,
      processingManagerId,
      subjectId,
      seScore,
      discountAmount,
      cashAmount,
      cardAmount,
      actualAmount,
      unCollectedAmount,
      receiptClassification,
      paymentDate,
      situationReport,
      amountReceived,
      subDiv,
      courseComplete,
      employment,
      dueDate,
      classCode,
      lectureAssignment,
      isWeekend,
      supportType,
    );
  }
}
