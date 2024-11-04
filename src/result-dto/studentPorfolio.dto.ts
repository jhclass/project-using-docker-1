import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentPayment } from "./studentPayment.dto";
import { Subject } from "./subject.dto";
import { Branch } from "./branch.dto";

//StudentPortfolio (학생포트폴리오)
@ObjectType()
export class StudentPortfolio {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  lectureId: number; //강의id
  @Field(() => Int)
  studentId: number; // 학생id
  @Field()
  stName: string;
  @Field()
  isBest: string; //Y or N ,Y 일 경우 우수학생(추천학생) 기본값:N
  @Field(() => [String])
  filePath: string[]; //포트폴리오링크 배열
  @Field({ nullable: true })
  details?: string; //한줄평
  @Field(() => [String], { nullable: true })
  url?: string[];
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => StudentPayment)
  StudentPayment: StudentPayment;
  @Field(() => Int)
  studentPaymentId: number;
  @Field(() => Subject)
  Subject: Subject;
  @Field(() => Int)
  subjectId: number;
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
