import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentPayment } from "../../student-payment/entity/studentPayment.entity";
import { Student } from "../../student/entity/student.entity";
import { Lectures } from "@src/lecture/entity/lectures.entity";
import { Branch } from "@src/branch/entity/branch.entity";
import { CommonResponse } from "@src/common-entity/common-response.entity";

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
@ObjectType()
export class SeeAttendanceResult extends CommonResponse {
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  enrollData?: Attendance[]; //전체
  @Field(() => Int, { nullable: true })
  enrollCount?: number;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  attendanceData?: Attendance[]; //출석
  @Field(() => Int, { nullable: true })
  attendanceCount?: number;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  absentData?: Attendance[]; //결석
  @Field(() => Int, { nullable: true })
  absentCount?: number;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  leaveEarlyData?: Attendance[]; //조퇴
  @Field(() => Int, { nullable: true })
  leaveEarlyCount?: number;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  outingData?: [Attendance]; //외출
  @Field(() => Int, { nullable: true })
  outingCount?: number;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  tardyData?: [Attendance]; //지각
  @Field(() => Int, { nullable: true })
  tardyCount?: number;
}

@ObjectType()
export class SearchAttendanceResult extends CommonResponse {
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  data?: Attendance[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
