import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ManageUser } from "./manageUser.dto";
import { PermissionsGranted } from "./permissionsGranted.dto";
import { AdviceType } from "./adviceType.dto";
import { Alarm } from "./alarm.dto";
import { AttendanceRecord } from "./attendanceRecord.dto";
import { StudentState } from "./studentState.dto";
import { Subject } from "./subject.dto";
import { UserActivityLogs } from "./user-activity-logs.dto";

@ObjectType()
export class CommonResponse {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class DeleteFileResponse {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class ResultLogin {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  token?: string;
  @Field({ nullable: true })
  refreshToken?: string;
}

@ObjectType()
export class ResultSeeManageUser {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [ManageUser], { nullable: "itemsAndList" })
  data?: ManageUser[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class SearchManageUserResult {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  message?: string;
  @Field(() => [ManageUser], { nullable: "itemsAndList" })
  data?: ManageUser[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class ResultRefreshToken {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  newAccessToken?: string;
}
@ObjectType()
export class ResultIsMe {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class ResultSearchPermissionsGranted {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [PermissionsGranted], { nullable: "itemsAndList" })
  data?: PermissionsGranted[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
@ObjectType()
export class UpdateStudentStateResult {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}
@ObjectType()
export class StudentStateResponse {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field(() => [StudentState], { nullable: "itemsAndList" })
  studentState?: StudentState[];
}
@ObjectType()
export class UpdateFavoriteResult {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => ManageUser, { nullable: true })
  favoriteStudentState?: ManageUser;
}
@ObjectType()
export class ResultAdviceType {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [AdviceType], { nullable: "itemsAndList" })
  adviceType?: AdviceType[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class ResultSeeAlarms {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [Alarm], { nullable: "itemsAndList" })
  data?: Alarm[];
  @Field({ nullable: true })
  totalCount?: number;
}

@ObjectType()
export class ResultSearchAttendanceRecord {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [AttendanceRecord], { nullable: "itemsAndList" })
  result?: AttendanceRecord[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class SearchStudentStateResult {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  message?: string;
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field(() => [StudentState], { nullable: "itemsAndList" })
  studentState?: StudentState[];
}

@ObjectType()
export class SearchSubjectResult {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field({ nullable: true })
  message?: string;
  @Field(() => [Subject], { nullable: "itemsAndList" })
  result?: Subject[];
}

@ObjectType()
export class SeeSubjectResult {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  message?: string;
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field(() => [Subject], { nullable: "itemsAndList" })
  subject?: Subject[];
}

@ObjectType()
export class UserActivityLogsResponse {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  message?: string;
  @Field(() => [UserActivityLogs], { nullable: "itemsAndList" })
  data?: UserActivityLogs[];
  @Field(() => Int, { nullable: true })
  totalCount: number;
}

@ObjectType()
export class DashboardTodayResult {
  @Field({ nullable: true })
  ok?: boolean;
  @Field(() => Int, { nullable: true })
  today?: number;
  @Field(() => Int, { nullable: true })
  compareToday?: number;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class DashboardMonthResult {
  @Field({ nullable: true })
  ok?: boolean;
  @Field(() => Int, { nullable: true })
  month?: number;
  @Field(() => Int, { nullable: true })
  compareMonth?: number;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class DashboardUnpResult {
  @Field({ nullable: true })
  ok?: boolean;
  @Field(() => Int, { nullable: true })
  unpCount?: number;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}
@ObjectType()
export class DashboardATResult {
  @Field(() => [String], { nullable: "itemsAndList" })
  topFiveName?: string[];
  @Field(() => [Int], { nullable: true })
  count?: number[];
  @Field(() => Int, { nullable: true })
  totalStudentState?: number;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}
@ObjectType()
export class DashboardRDResult {
  @Field({ nullable: true })
  receiptDiv?: string;
  @Field(() => Int, { nullable: true })
  count?: number;
}
