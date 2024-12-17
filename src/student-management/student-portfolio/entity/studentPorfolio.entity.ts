import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentPayment } from "../../../student-payment/entity/studentPayment.entity";
import { Subject } from "../../../subject/entity/subject.entity";
import { Branch } from "../../../branch/entity/branch.entity";

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
  @Field(() => [String], { nullable: "itemsAndList" })
  url?: string[];
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => StudentPayment, { nullable: true })
  StudentPayment?: StudentPayment;
  @Field(() => Int)
  studentPaymentId: number;
  @Field(() => Subject, { nullable: true })
  Subject?: Subject;
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
