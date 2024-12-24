import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Subject } from "../../../subject/entity/subject.entity";
import { StudentPayment } from "../../../student-payment/entity/studentPayment.entity";
import { Branch } from "../../../branch/entity/branch.entity";

//PreInspection(사전점검)
@ObjectType()
export class PreInspection {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  lectureId: number; //강의id
  @Field(() => Int)
  studentId: number; // 학생id
  @Field()
  stName: string; // 학생이름
  @Field(() => String, { nullable: true })
  dateOfPreInspection?: Date; //사전점검일
  @Field({ nullable: true })
  preScreenerType?: string; // 사전검사구분 "강사","교무팀"
  @Field({ nullable: true })
  preInspectionDetails?: string; // 사전점검내용
  @Field({ nullable: true })
  actionTaken?: string; //조치사항
  @Field(() => Subject, { nullable: true })
  Subject?: Subject;
  @Field(() => Int)
  subjectId: number;
  @Field(() => StudentPayment, { nullable: true })
  StudentPayment?: StudentPayment;
  @Field(() => Int)
  studentPaymentId: number;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field()
  lastModifiedByUserId: string; // 직원아이디
  @Field()
  lastModifiedByName: string; //직원이름
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //최근수정시간
}