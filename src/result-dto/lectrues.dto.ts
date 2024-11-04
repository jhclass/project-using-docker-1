import { ObjectType, Field, Int } from "@nestjs/graphql";

import { Subject } from "./subject.dto";
import { ManageUser } from "./manageUser.dto";
import { WorkLogs } from "./workLogs.dto";

//Lectures(강의)
@ObjectType()
export class Lectures {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field()
  campus: string; // 신촌점이 입력될 수 있도록
  @Field()
  temporaryName: string;
  @Field()
  subDiv: string; // null 이면 안됩니다.
  @Field(() => [ManageUser])
  teachers: ManageUser[];
  @Field()
  roomNum: string;
  @Field(() => Subject, { nullable: true })
  subject?: Subject;
  @Field(() => Int)
  subjectId: number;
  @Field()
  lecturePeriodStart: string;
  @Field()
  lecturePeriodEnd: string;
  @Field(() => [String])
  lectureDetails: string[]; //강의 일자들
  @Field(() => [String])
  lectureTime: string[]; //시작, 종료시간
  @Field()
  eduStatusReport: string; //교육상황보고 연동
  @Field(() => Int)
  ApprovedNum: number; //승인인원
  @Field(() => Int)
  confirmedNum: number; //확정인원
  @Field(() => Int)
  sessionNum: number; //회차
  @Field({ nullable: true })
  timetableAttached?: string; //시간표첨부
  @Field(() => [WorkLogs], { nullable: true })
  WorkLogs?: WorkLogs[];
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //최근수정시간
}
