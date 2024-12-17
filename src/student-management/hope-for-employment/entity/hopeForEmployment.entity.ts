import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Subject } from "../../../subject/entity/subject.entity";
import { StudentPayment } from "../../../student-payment/entity/studentPayment.entity";
import { Branch } from "../../../branch/entity/branch.entity";
//HopeForEmployment (취업희망분야)
@ObjectType()
export class HopeForEmployment {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  lectureId: number; //강의id
  @Field(() => Int)
  studentId: number; // 학생id
  @Field()
  stName: string; // 학생이름
  @Field()
  workingArea: string; // 근무지역
  @Field()
  fieldOfHope: string; // 희망분야
  @Field(() => Int)
  hopefulReward: number; // 희망보수(int!)
  @Field()
  workType: string; // 근무형태 : 정규,비정규
  @Field(() => Int)
  workingHours: number; // 근무시간 (int)
  @Field()
  opinion: string; // 의견
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
