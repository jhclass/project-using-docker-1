import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ManageUser } from "./manageUser.dto";
import { Branch } from "./branch.dto";
import { AdviceType } from "./adviceType.dto";
import { ConsultationMemo } from "./consultationMemo.dto";

//StudentState (상담관리)
@ObjectType()
export class StudentState {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  campus?: string;
  @Field({ nullable: true })
  category?: string;
  @Field()
  stName: string;
  @Field()
  phoneNum1: string;
  @Field({ nullable: true })
  phoneNum2?: string;
  @Field({ nullable: true })
  phoneNum3?: string;
  @Field(() => ManageUser, { nullable: true })
  currentManager?: ManageUser;
  @Field(() => Int, { nullable: true })
  currentManagerId?: number;
  @Field(() => [String], { nullable: true })
  subject?: string[];
  @Field({ nullable: true })
  detail?: string;
  @Field()
  agreement: string;
  @Field(() => Int)
  progress: number;
  @Field({ nullable: true })
  stEmail?: string;
  @Field({ nullable: true })
  stAddr?: string;
  @Field({ nullable: true })
  subDiv?: string;
  @Field(() => String, { nullable: true })
  stVisit?: Date;
  @Field(() => String, { nullable: true })
  expEnrollDate?: Date;
  @Field({ nullable: true })
  perchase?: boolean;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field({ nullable: true })
  receiptDiv?: string;
  @Field({ nullable: true })
  pic?: string; // 기본값 설정이 가능하면 설정
  @Field(() => [String], { nullable: true })
  classMethod?: string[];
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => [AdviceType], { nullable: "itemsAndList" })
  adviceTypes?: AdviceType[];
  @Field(() => [ConsultationMemo], { nullable: "itemsAndList" })
  consultationMemo?: ConsultationMemo[];
}
