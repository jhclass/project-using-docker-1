import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentPayment } from "./studentPayment.dto";
import { ManageUser } from "./manageUser.dto";
import { Branch } from "./branch.dto";

@ObjectType()
export class PaymentDetail {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  cardCompany?: string; // 카드회사
  @Field({ nullable: true })
  cardNum?: string; //카드번호
  @Field(() => Int, { nullable: true })
  installment?: number; //할부개월
  @Field({ nullable: true })
  ApprovalNum?: string; //승인번호
  @Field(() => Int, { nullable: true })
  amountPayment?: number; //결제금액
  //@Field(() => Int, { nullable: true })
  //unpaidPayment?: number; //미수납액
  @Field(() => String, { nullable: true })
  paymentDate?: Date; //결제일
  @Field({ nullable: true })
  bankName?: string; //은행이름
  @Field({ nullable: true })
  depositorName?: string; // 입금자명
  @Field(() => Int, { nullable: true })
  depositAmount?: number; //입금금액
  @Field({ nullable: true })
  depositDate?: string; //입금일
  @Field(() => StudentPayment)
  studentPayment: StudentPayment;
  @Field(() => Int)
  studentPaymentId: number; //연결된 학생결제(StudentPayment 의 id)
  @Field(() => ManageUser, { nullable: true })
  receiver?: ManageUser;
  @Field(() => Int, { nullable: true })
  receiverId?: number;
  @Field({ nullable: true })
  accountingManager?: string;
  @Field({ nullable: true })
  reqRefund?: boolean;
  @Field({ nullable: true })
  reqRefundManager?: string; // 환불신청자
  @Field(() => Int, { nullable: true })
  reqRefundManagerId?: number; // 환불신청한 매니저 아이디
  @Field(() => String, { nullable: true })
  reqRefundDate?: Date; //환불신청일
  @Field({ nullable: true })
  refundApproval?: boolean;
  @Field({ nullable: true })
  refundManager?: string; //환불승인자
  @Field(() => String, { nullable: true })
  refundApprovalDate?: Date; //환불승인일
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => Int, { nullable: true })
  studentId?: number;
  @Field({ nullable: true })
  stName?: string;
  @Field(() => [String], { nullable: "itemsAndList" })
  cashReceipts?: string[];
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //최근수정시간
}
