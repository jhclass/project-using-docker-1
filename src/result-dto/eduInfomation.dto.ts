import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Subject } from "./subject.dto";
import { StudentPayment } from "./studentPayment.dto";
import { Branch } from "./branch.dto";

//EduInfomaion (학력사항)
@ObjectType()
export class EduInfomation {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  lectureId: number; //강의id
  @Field(() => Int)
  studentId: number; // 학생id
  @Field()
  stName: string; // 학생이름
  @Field()
  eduType: string; // 학교
  @Field()
  eduName: string; // 학교이름
  @Field({ nullable: true })
  major?: string; // 전공
  @Field()
  graduationStatus: string; // 졸업여부
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
