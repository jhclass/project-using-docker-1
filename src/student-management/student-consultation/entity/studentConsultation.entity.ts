import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Subject } from "../../../subject/entity/subject.entity";
import { StudentPayment } from "../../../student-payment/entity/studentPayment.entity";
import { Branch } from "../../../branch/entity/branch.entity";

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
