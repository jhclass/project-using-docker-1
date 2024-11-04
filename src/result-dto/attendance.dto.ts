import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentPayment } from "./studentPayment.dto";
import { Student } from "./student.dto";
import { Lectures } from "./lectrues.dto";
import { Branch } from "./branch.dto";

//Attendance (출석)
@ObjectType()
export class Attendance {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field({ nullable: true })
  attendanceState?: string; //출석,지각,조퇴,결석,외출,지각&조퇴,등 현 상태
  @Field({ nullable: true })
  attendanceDate?: string;
  @Field(() => StudentPayment, { nullable: true })
  studentPayment?: StudentPayment;
  @Field(() => Int)
  studentPaymentId: number; //반드시 포함.
  @Field(() => Student, { nullable: true })
  student?: Student;
  @Field(() => Int, { nullable: true })
  studentId?: number;
  @Field(() => Lectures, { nullable: true })
  lectures?: Lectures;
  @Field(() => Int, { nullable: true })
  lecturesId?: number;
  @Field({ nullable: true })
  isCanceled?: string;
  @Field(() => String, { nullable: true })
  attendanceDateTime?: Date;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //최근수정시간
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
}
