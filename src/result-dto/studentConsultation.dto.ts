import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Subject } from "./subject.dto";
import { StudentPayment } from "./studentPayment.dto";
import { Branch } from "./branch.dto";

//StudentConsultation(학적부)
@ObjectType()
export class StudentConsultation {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  lectureId: number; //강의id
  @Field(() => Int)
  studentId: number; // 학생id
  @Field()
  stName: string; // 학생이름
  @Field()
  typeOfConsultation: string; // 상담유형 : 기초상담,취업상담, 사후관리
  @Field(() => String)
  dateOfConsultation: Date; // 상담일자
  @Field()
  detailsOfConsultation: string; // 상담내용
  @Field(() => Subject)
  Subject: Subject;
  @Field(() => Int)
  subjectId: number;
  @Field(() => StudentPayment)
  StudentPayment: StudentPayment;
  @Field(() => Int)
  studentPaymentId: number;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int)
  branchId?: number;
  @Field()
  lastModifiedByUserId: string; // 직원아이디
  @Field()
  lastModifiedByName: string; //직원이름
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //최근수정시간
}
