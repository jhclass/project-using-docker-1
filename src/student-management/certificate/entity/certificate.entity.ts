import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Subject } from "../../../subject/entity/subject.entity";
import { StudentPayment } from "../../../student-payment/entity/studentPayment.entity";
import { Branch } from "../../../branch/entity/branch.entity";

//Certificate (자격취득현황)
@ObjectType()
export class Certificate {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  lectureId: number; //강의id
  @Field(() => Int)
  studentId: number; // 학생id
  @Field()
  stName: string; // 학생이름
  @Field(() => String)
  CAdate: Date; //자격취득일
  @Field()
  certificateName: string; //자격증이름
  @Field({ nullable: true })
  certificateLevel?: string; //자격증급수
  @Field()
  CertificateIssuer: string; //자격증발행처
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
