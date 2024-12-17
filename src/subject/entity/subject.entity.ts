import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentPayment } from "../../student-payment/entity/studentPayment.entity";
import { Lectures } from "@src/lecture/entity/lectures.entity";
import { Branch } from "../../branch/entity/branch.entity";
import { CommonResponse } from "@src/common-entity/common-response.entity";

//Subject(과정)
@ObjectType()
export class Subject {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field({ nullable: true })
  subDiv?: string;
  @Field({ nullable: true })
  subjectName?: string;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field(() => Int, { nullable: true })
  fee?: number;
  @Field(() => String, { nullable: true })
  startDate?: Date;
  @Field(() => String, { nullable: true })
  endDate?: Date;
  @Field({ nullable: true })
  roomNum?: string;
  @Field({ nullable: true })
  exposure?: boolean;
  @Field(() => Int, { nullable: true })
  totalTime?: number;
  @Field({ nullable: true })
  teacherName?: string;
  @Field({ nullable: true })
  subjectCode?: string;
  @Field(() => String, { nullable: true })
  expiresDateStart?: Date;
  @Field(() => String, { nullable: true })
  expiresDateEnd?: Date;
  @Field(() => Int, { nullable: true })
  round?: number;
  @Field(() => [StudentPayment], { nullable: true })
  StudentPayment?: StudentPayment[];
  @Field(() => Lectures, { nullable: true })
  lectures?: Lectures;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //#최근수정시간
}

@ObjectType()
export class SearchSubjectResult extends CommonResponse {
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field(() => [Subject], { nullable: "itemsAndList" })
  result?: Subject[];
}
@ObjectType()
export class SeeSubjectResult extends CommonResponse {
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field(() => [Subject], { nullable: "itemsAndList" })
  subject?: Subject[];
}
