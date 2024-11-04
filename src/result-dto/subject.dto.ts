import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentPayment } from "./studentPayment.dto";
import { Lectures } from "./lectrues.dto";
import { Branch } from "./branch.dto";

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
  @Field({ nullable: true })
  expiresDateStart?: string;
  @Field({ nullable: true })
  expiresDateEnd?: string;
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
