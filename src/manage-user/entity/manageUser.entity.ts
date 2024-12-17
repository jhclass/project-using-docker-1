import { ObjectType, Field, Int } from "@nestjs/graphql";
import { PermissionsGranted } from "../../permissions-granted/entity/permissionsGranted.entity";
import { StudentState } from "../../student-state/entity/studentState.entity";
import { Student } from "../../student/entity/student.entity";
import { StudentMemo } from "@src/student-memo/entity/studentMemo.entity";
import { StudentPayment } from "../../student-payment/entity/studentPayment.entity";
import { PaymentDetail } from "../../payment-detail/entity/paymentDetail.entity";
import { Lectures } from "@src/lecture/entity/lectures.entity";
import { Stamp } from "../../stamp/entity/stamp.entity";
import { Branch } from "../../branch/entity/branch.entity";
import { Sms } from "@src/sms/entity/sms.entity";
import { ConsultationMemo } from "@src/student-state/consultation-memo/entity/consultationMemo.entity";
//ManageUser
@ObjectType()
export class ManageUser {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field({ nullable: true })
  mUserId?: string;
  @Field({ nullable: true })
  mUsername?: string;
  @Field()
  mPassword: string;
  @Field(() => Int, { nullable: true })
  mGrade?: number;
  @Field({ nullable: true })
  mRank?: string;
  @Field({ nullable: true })
  mPhoneNum?: string;
  @Field({ nullable: true })
  mPhoneNumCompany?: string;
  @Field({ nullable: true })
  mPhoneNumInside?: string;
  @Field({ nullable: true })
  mPhoneNumFriend?: string;
  @Field(() => [String], { nullable: true })
  mPart?: string[];
  @Field({ nullable: true })
  mAvatar?: string;
  @Field(() => String, { nullable: true })
  mJoiningDate?: Date;
  @Field({ nullable: true })
  mAddresses?: string;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field({ nullable: true })
  resign?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  mZipCode?: string;
  @Field({ nullable: true })
  mAddressDetail?: string;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => [PermissionsGranted], { nullable: true })
  PermissionsGranted?: PermissionsGranted[];
  @Field(() => [StudentState], { nullable: true })
  StudentState?: StudentState[];
  @Field(() => [ConsultationMemo], { nullable: true })
  ConsultationMemo?: ConsultationMemo[];
  @Field(() => [Int], { nullable: true })
  favoriteStudentState?: number[];
  @Field(() => [Student], { nullable: true })
  Student?: Student[];
  @Field(() => [StudentMemo], { nullable: true })
  StudentMemo?: StudentMemo[];
  @Field(() => [StudentPayment], { nullable: true })
  StudentPayment?: StudentPayment[];
  @Field(() => [PaymentDetail], { nullable: true })
  PaymentDetail?: PaymentDetail[];
  @Field(() => [Lectures], { nullable: true })
  Lectures?: Lectures[];
  @Field(() => [Stamp], { nullable: true })
  Stamp?: Stamp[];
  @Field({ nullable: true })
  lastModifiedBy?: string;
  @Field(() => [String], { nullable: "itemsAndList" })
  frequentlyUsed: string[]; //자주 사용하는 문장
  @Field(() => [Sms], { nullable: "itemsAndList" })
  Sms?: Sms[];
}

@ObjectType()
export class SeeManageUserResult {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [ManageUser], { nullable: "itemsAndList" })
  data?: ManageUser[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class SearchManageUserResult {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  message?: string;
  @Field(() => [ManageUser], { nullable: "itemsAndList" })
  data?: ManageUser[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
