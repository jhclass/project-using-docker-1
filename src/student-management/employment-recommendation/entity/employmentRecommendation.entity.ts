import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Subject } from "../../../subject/entity/subject.entity";
import { StudentPayment } from "../../../student-payment/entity/studentPayment.entity";
import { Branch } from "../../../branch/entity/branch.entity";

//EmploymentRecommendation (취업추천)
@ObjectType()
export class EmploymentRecommendation {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  lectureId: number; //강의id
  @Field(() => Int)
  studentId: number; // 학생id
  @Field()
  stName: string; // 학생이름
  @Field(() => String)
  dateOfRecommendation: Date; // 추천일자
  @Field()
  recruitmentField: string; // 채용분야
  @Field()
  companyName: string; // 회사명
  @Field()
  location: string; // 소재지
  @Field()
  phoneNum: string; // 전화번호
  @Field(() => String, { nullable: true })
  dateOfInterview?: Date; // 면접일
  @Field()
  employmentStatus: string; // 취업여부 : Y || N
  @Field()
  reasonForNonEmployment: string; // 미취업사유
  @Field()
  certificateOfEmploymentStatus: string; // 재직증명서확보여부 : Y || N
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
