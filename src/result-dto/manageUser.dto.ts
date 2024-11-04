import { ObjectType, Field, Int } from "@nestjs/graphql";
import { PermissionsGranted } from "./permissionsGranted.dto";
import { StudentState } from "./studentState.dto";
import { ConsultationMemo } from "./consultationMemo.dto";
import { Student } from "./student.dto";
import { StudentMemo } from "./studentMemo.dto";
import { StudentPayment } from "./studentPayment.dto";
import { PaymentDetail } from "./paymentDetail.dto";
import { Lectures } from "./lectrues.dto";
import { Stamp } from "./stamp.dto";
import { Branch } from "./branch.dto";
//ManageUser
@ObjectType()
export class ManageUser {
  @Field(() => Int)
  id: number;
  @Field()
  mUserId: string;
  @Field()
  mUsername: string;
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
}
