import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Branch } from "../../branch/entity/branch.entity";
import { Lectures } from "@src/lecture/entity/lectures.entity";
import { CommonResponse } from "@src/common-entity/common-response.entity";
//WorkLogs(업무일지)
@ObjectType()
export class WorkLogs {
  @Field(() => Int, { nullable: true })
  id: number;
  @Field(() => String) //여기부터 다시 진행
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field({ nullable: true })
  paymentOne?: string; //#결제1 (강사)
  @Field({ nullable: true })
  paymentTwo?: string; //#결제2 (담당직원)
  @Field({ nullable: true })
  paymentThree?: string; //#결제3 (관리자)
  @Field(() => [String], { nullable: "itemsAndList" })
  trainingInfoOne?: string[]; //# 교시, 담당교사, 교과목명, 능력단위명, 훈련내용
  @Field(() => [String], { nullable: "itemsAndList" })
  trainingInfoTwo?: string[];
  @Field(() => [String], { nullable: "itemsAndList" })
  trainingInfoThree?: string[];
  @Field(() => [String], { nullable: "itemsAndList" })
  trainingInfoFour?: string[];
  @Field(() => [String], { nullable: "itemsAndList" })
  trainingInfoFive?: string[];
  @Field(() => [String], { nullable: "itemsAndList" })
  trainingInfoSix?: string[];
  @Field(() => [String], { nullable: "itemsAndList" })
  trainingInfoSeven?: string[];
  @Field(() => [String], { nullable: "itemsAndList" })
  trainingInfoEight?: string[];
  @Field(() => [Int], { nullable: "itemsAndList" })
  trainingTimeOneday?: number[]; //#일계 - 교양, 전공, 실습, 기타, 계
  @Field(() => [Int], { nullable: "itemsAndList" })
  trainingTimeTotal?: number[]; //#누계 - 교양, 전공, 실습, 기타, 계
  @Field({ nullable: true })
  instruction?: string; //# 지시사항
  @Field({ nullable: true })
  absentSt?: string; //#결석학생
  @Field({ nullable: true })
  tardySt?: string; //#지각학생
  @Field({ nullable: true })
  leaveEarlySt?: string; //#조퇴학생
  @Field({ nullable: true })
  outingSt?: string; //#외출학생
  @Field({ nullable: true })
  etc?: string; //#기타사항
  @Field(() => Lectures, { nullable: true })
  lectures?: Lectures;
  @Field(() => Int)
  lecturesId: number;
  @Field()
  workLogsDate: string;
  @Field(() => [Int], { nullable: "itemsAndList" })
  attendanceCount: number[]; // #출석 카운트 [재적,출석,결석,지각,조퇴,외출]
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  BranchId?: number;
  @Field(() => [String], { nullable: "itemsAndList" })
  checkList?: string[];
  @Field(() => [String], { nullable: "itemsAndList" })
  checkContext?: string[];
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //#최근수정시간
}
@ObjectType()
export class SearchWorkLogsResult extends CommonResponse {
  @Field(() => [WorkLogs], { nullable: "itemsAndList" })
  data?: WorkLogs[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
@ObjectType()
export class SignWorkLogsResult extends CommonResponse {
  @Field({ nullable: true })
  stampUrl?: string;
}
