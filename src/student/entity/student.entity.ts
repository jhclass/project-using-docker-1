import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentMemo } from "@src/student-memo/entity/studentMemo.entity";
import { StudentPayment } from "../../student-payment/entity/studentPayment.entity";
import { ManageUser } from "../../manage-user/entity/manageUser.entity";
import { Branch } from "../../branch/entity/branch.entity";
import { CommonResponse } from "@src/common-entity/common-response.entity";

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

@ObjectType()
export class SeeStudentResult extends CommonResponse {
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field(() => [Student], { nullable: "itemsAndList" })
  student?: Student[];
}

@ObjectType()
export class SearchStudentResult extends CommonResponse {
  @Field(() => [Student], { nullable: true })
  student?: Student[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
