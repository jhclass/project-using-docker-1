import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Subject } from "./subject.dto";
import { StudentPayment } from "./studentPayment.dto";
import { Branch } from "./branch.dto";
//EmploymentStatus (취업관리)
@ObjectType()
export class EmploymentStatus {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  studentId: number; // 학생id
  @Field()
  stName: string; // 학생이름
  @Field()
  employmentType: string; // 구분 : 취업,창업
  @Field(() => String)
  dateOfEmployment: Date; // 취업일자
  @Field()
  companyName: string; // 회사이름
  @Field()
  businessNum: string; // 사업자번호
  @Field()
  responsibilities: string; // 담당업무
  @Field()
  location: string; // 소재지
  @Field()
  phoneNum: string; // 전화번호
  @Field()
  businessSize: string; // 사업장규모
  @Field()
  imploymentInsurance: string; // 고용보험여부 : Y || N
  @Field()
  proofOfImployment: string; // 재직증명 : Y || N
  @Field()
  relatedFields: string; // 관련분야 : 동일/관련/다른
  @Field()
  completionType: string; // 수료타입 : 조기,수료
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
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field()
  lastModifiedByUserId: string; // 직원아이디
  @Field()
  lastModifiedByName: string; //직원이름
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //최근수정시간
}
