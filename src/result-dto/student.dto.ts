import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentMemo } from "./studentMemo.dto";
import { StudentPayment } from "./studentPayment.dto";
import { ManageUser } from "./manageUser.dto";
import { Branch } from "./branch.dto";

//Student (수강생)
@ObjectType()
export class Student {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  phoneNum1: string;
  @Field({ nullable: true })
  phoneNum2?: string;
  @Field()
  smsAgreement: string;
  @Field()
  writer: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => String, { nullable: true })
  birthday?: Date;
  @Field(() => ManageUser, { nullable: true })
  manager?: ManageUser;
  @Field(() => Int, { nullable: true })
  managerUserId?: number;
  @Field(() => [StudentMemo], { nullable: true })
  studentMemo?: StudentMemo[];
  @Field(() => [StudentPayment], { nullable: true })
  studentPayment?: StudentPayment[];
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
}
