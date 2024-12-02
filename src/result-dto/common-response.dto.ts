import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ManageUser } from "./manageUser.dto";
import { PermissionsGranted } from "./permissionsGranted.dto";
import { AdviceType } from "./adviceType.dto";
import { Alarm } from "./alarm.dto";
import { AttendanceRecord } from "./attendanceRecord.dto";
import { StudentState } from "./studentState.dto";
import { Subject } from "./subject.dto";
import { UserActivityLogs } from "./user-activity-logs.dto";
import { Student } from "./student.dto";
import { StudentPayment } from "./studentPayment.dto";
import { PaymentDetail } from "./paymentDetail.dto";
import { HourlyData } from "./hourlyData.dto";
import { Lectures } from "./lectures.dto";
import { Attendance } from "./attendance.dto";
import { WorkLogs } from "./workLogs.dto";

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
export class DeleteFileResponse extends CommonResponse {}

@ObjectType()
export class ResultLogin extends CommonResponse {
  @Field({ nullable: true })
  token?: string;
  @Field({ nullable: true })
  refreshToken?: string;
}

@ObjectType()
export class SeeManageUserResult {
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

@ObjectType()
export class SeeStudentResult {
  @Field({ nullable: true })
  ok?: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field(() => [Student], { nullable: "itemsAndList" })
  student?: Student[];
}

@ObjectType()
export class SearchStudentResult {
  @Field({ nullable: true })
  ok?: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [Student], { nullable: true })
  student?: Student[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class StudentPaymentResult extends CommonResponse {
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field(() => [StudentPayment], { nullable: "itemsAndList" })
  StudentPayment?: StudentPayment[];
}

@ObjectType()
export class SearchStudentPaymentResult extends CommonResponse {
  @Field(() => [StudentPayment], { nullable: "itemsAndList" })
  data?: StudentPayment[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class PaymentDetailResult extends CommonResponse {
  @Field(() => [PaymentDetail], { nullable: "itemsAndList" })
  PaymentDetail?: PaymentDetail[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class HourlySalesData extends CommonResponse {
  @Field(() => [HourlyData], { nullable: "itemsAndList" })
  hourlyDetails?: HourlyData[];
  @Field(() => Int, { nullable: true })
  hourlyTotalCard?: number;
  @Field(() => Int, { nullable: true })
  hourlyTotalCardRefund?: number;
  @Field(() => Int, { nullable: true })
  hourlyTotalCash?: number;
  @Field(() => Int, { nullable: true })
  hourlyTotalCashRefund?: number;
  @Field(() => Int, { nullable: true })
  thisTimeRefundTotal?: number;
  @Field(() => Int, { nullable: true })
  thisTimeAmountTotal?: number;
  @Field(() => Int, { nullable: true })
  thisTimeRealTotal?: number;
}

@ObjectType()
export class SalesStatisticsResult extends CommonResponse {
  @Field(() => [ProcessingManagerGroupResult], { nullable: "itemsAndList" })
  data?: ProcessingManagerGroupResult[];
}

@ObjectType()
export class SalesStatisticsListResult extends CommonResponse {
  @Field(() => [PaymentDetail], { nullable: "itemsAndList" })
  paymentData?: [PaymentDetail];
  @Field(() => [PaymentDetail], { nullable: "itemsAndList" })
  refundData?: [PaymentDetail];
  @Field(() => Int, { nullable: true })
  receiverId?: number;
}

@ObjectType()
export class ProcessingManagerGroupResult {
  @Field(() => Int, { nullable: true })
  receiverId?: number;
  @Field(() => Int, { nullable: true })
  totalAmount?: number;
  @Field(() => Int, { nullable: true })
  totalRefundAmount?: number;
  @Field(() => Int, { nullable: true })
  totalActualAmount?: number;
  @Field(() => Int, { nullable: true })
  totalPaymentCount?: number;
  @Field(() => Int, { nullable: true })
  totalRefundCount?: number;
}

@ObjectType()
export class SeeLecturesResult extends CommonResponse {
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field(() => [Lectures], { nullable: "itemsAndList" })
  data?: Lectures[];
}

@ObjectType()
export class SearchLecturesResult extends CommonResponse {
  @Field(() => Int, { nullable: true })
  totalCount?: number;
  @Field(() => [Lectures], { nullable: "itemsAndList" })
  data?: Lectures[];
}

@ObjectType()
export class SeeAttendanceResult extends CommonResponse {
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  enrollData?: Attendance[]; //전체
  @Field(() => Int, { nullable: true })
  enrollCount?: number;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  attendanceData?: Attendance[]; //출석
  @Field(() => Int, { nullable: true })
  attendanceCount?: number;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  absentData?: Attendance[]; //결석
  @Field(() => Int, { nullable: true })
  absentCount?: number;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  leaveEarlyData?: Attendance[]; //조퇴
  @Field(() => Int, { nullable: true })
  leaveEarlyCount?: number;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  outingData?: [Attendance]; //외출
  @Field(() => Int, { nullable: true })
  outingCount?: number;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  tardyData?: [Attendance]; //지각
  @Field(() => Int, { nullable: true })
  tardyCount?: number;
}

@ObjectType()
export class SearchAttendanceResult extends CommonResponse {
  @Field(() => [Attendance], { nullable: "itemsAndList" })
  data?: Attendance[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class SearchWorkLogsResult extends CommonResponse {
  @Field(() => [WorkLogs], { nullable: "itemsAndList" })
  data?: WorkLogs[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
