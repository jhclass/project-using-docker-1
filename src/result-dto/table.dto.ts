import { ObjectType, Field, Int } from "@nestjs/graphql";
@ObjectType()
export class Branch {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  branchName?: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => [AdviceType])
  AdviceType: AdviceType[];
  @Field(() => [StudentState])
  StudentState: StudentState[];
  @Field(() => [ConsultationMemo])
  ConsultationMemo: ConsultationMemo[];
  @Field(() => [PermissionsGranted])
  PermissionsGranted: PermissionsGranted[];
}

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
  mPhoneFriend?: string;
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
}

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
  currentManagerInt: number;
  @Field(() => [String], { nullable: true })
  subject?: string[];
  @Field({ nullable: true })
  detail?: string;
  @Field()
  agreement: string;
  @Field(() => Int)
  progress: number;
  @Field({ nullable: true })
  stEmail: string;
  @Field({ nullable: true })
  stAddr: string;
  @Field({ nullable: true })
  subDiv: string;
  @Field({ nullable: true })
  stVisit: string;
  @Field({ nullable: true })
  expEnrollDate: string;
  @Field({ nullable: true })
  perchase?: boolean;
  @Field(() => Date)
  createdAt: string;
  @Field(() => Date)
  updatedAt: string;
  @Field({ nullable: true })
  receiptDiv?: string;
  @Field({ nullable: true })
  pic: string;
  @Field(() => [String], { nullable: true })
  classMethod?: string[];
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field({ nullable: true })
  lastModifiedTime?: string;
}

//분야관리
@ObjectType()
export class AdviceType {
  @Field(() => Int)
  id: number;
  @Field()
  type: string;
  @Field(() => Int)
  indexNum: number;
  @Field({ nullable: true })
  category?: string;
  @Field({ nullable: true })
  onOff?: string;
  @Field({ nullable: true })
  defaultValue?: string;
  @Field(() => Date)
  createdAt: string;
  @Field(() => Date)
  updatedAt: string;
  @Field(() => [StudentState], { nullable: true })
  studentStates: StudentState[];
  @Field({ nullable: true })
  lastModifiedTime?: string;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
}

//상담메모
@ObjectType()
export class ConsultationMemo {
  @Field(() => Int)
  id: number;
  @Field()
  content: string;
  @Field(() => Date)
  createdAt: string;
  @Field(() => Date)
  updatedAt: string;
  @Field(() => StudentState, { nullable: true })
  studentState?: StudentState;
  @Field(() => Int, { nullable: true })
  studentStateId?: number;
  @Field(() => ManageUser, { nullable: true })
  manageUser?: ManageUser;
  @Field(() => Int, { nullable: true })
  manageUserId?: number;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field({ nullable: true })
  lastModifiedTime?: string;
}

//PermisionsGranted(권한)
@ObjectType()
export class PermissionsGranted {
  @Field(() => Int)
  id: number;
  @Field()
  permissionName: string;
  @Field({ nullable: true })
  topic: string;
  @Field(() => [ManageUser])
  ManageUser: ManageUser[];
  @Field({ nullable: true })
  smsPermitted: string;
  @Field({ nullable: true })
  readOnly: string;
  @Field({ nullable: true })
  allPermitted: string;
  @Field(() => Date)
  createdAt: string;
  @Field(() => Date)
  updatedAt: string;
  @Field(() => Branch, { nullable: true })
  Branch: Branch;
  @Field(() => Int, { nullable: true })
  branchId: number;
  @Field(() => Date, { nullable: true })
  lastModifiedTime: string;
}
