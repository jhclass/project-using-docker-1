import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Career } from "@prisma/client";

@ObjectType()
export class Branch {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  branchName?: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => [AdviceType], { nullable: true })
  AdviceType?: AdviceType[];
  @Field(() => [StudentState], { nullable: true })
  StudentState?: StudentState[];
  @Field(() => [ConsultationMemo], { nullable: true })
  ConsultationMemo?: ConsultationMemo[];
  @Field(() => [PermissionsGranted], { nullable: true })
  PermissionsGranted?: PermissionsGranted[];
}

//ManageUser
@ObjectType()
export class ManageUser {
  @Field(() => Int)
  id: number;
  @Field()
  mUserId: string;
  @Field()
  mUsername: string;
  @Field()
  mPassword: string;
  @Field(() => Int, { nullable: true })
  mGrade?: number;
  @Field({ nullable: true })
  mRank?: string;
  @Field({ nullable: true })
  mPhoneNum?: string;
  @Field({ nullable: true })
  mPhoneNumCompany?: string;
  @Field({ nullable: true })
  mPhoneNumInside?: string;
  @Field({ nullable: true })
  mPhoneFriend?: string;
  @Field(() => [String], { nullable: true })
  mPart?: string[];
  @Field({ nullable: true })
  mAvatar?: string;
  @Field(() => String, { nullable: true })
  mJoiningDate?: Date;
  @Field({ nullable: true })
  mAddresses?: string;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field({ nullable: true })
  resign?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  mZipCode?: string;
  @Field({ nullable: true })
  mAddressDetail?: string;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => [PermissionsGranted], { nullable: true })
  PermissionsGranted?: PermissionsGranted[];
  @Field(() => [StudentState], { nullable: true })
  StudentState?: StudentState[];
  @Field(() => [ConsultationMemo], { nullable: true })
  ConsultationMemo?: ConsultationMemo[];
  @Field(() => [Int], { nullable: true })
  favoriteStudentState?: number[];
  @Field(() => [Student], { nullable: true })
  Student?: Student[];
  @Field(() => [StudentMemo], { nullable: true })
  StudentMemo?: StudentMemo[];
  @Field(() => [StudentPayment], { nullable: true })
  StudentPayment?: StudentPayment[];
  @Field(() => [PaymentDetail], { nullable: true })
  PaymentDetail?: PaymentDetail[];
  @Field(() => [Lectures], { nullable: true })
  Lectures?: Lectures[];
  @Field(() => [Stamp], { nullable: true })
  Stamp?: Stamp[];
}

//Stamp (도장)
@ObjectType()
export class Stamp {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field(() => ManageUser, { nullable: true })
  Manager?: ManageUser;
  @Field(() => Int, { nullable: true })
  manageUserId?: number;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field({ nullable: true })
  imageUrl?: string;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //최근수정시간
}

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

//Subject(과정)
@ObjectType()
export class Subject {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field({ nullable: true })
  subDiv?: string;
  @Field({ nullable: true })
  subjectName?: string;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field(() => Int, { nullable: true })
  fee?: number;
  @Field(() => String, { nullable: true })
  startDate?: Date;
  @Field(() => String, { nullable: true })
  endDate?: Date;
  @Field({ nullable: true })
  roomNum?: string;
  @Field({ nullable: true })
  exposure?: boolean;
  @Field(() => Int, { nullable: true })
  totalTime?: number;
  @Field({ nullable: true })
  teacherName?: string;
  @Field({ nullable: true })
  subjectCode?: string;
  @Field({ nullable: true })
  expiresDateStart?: string;
  @Field({ nullable: true })
  expiresDateEnd?: string;
  @Field(() => Int, { nullable: true })
  round?: number;
  @Field(() => [StudentPayment], { nullable: true })
  StudentPayment?: StudentPayment[];
  @Field(() => Lectures, { nullable: true })
  lectures?: Lectures;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //#최근수정시간
}

//WorkLogs(업무일지);
@ObjectType()
export class WorkLogs {
  @Field(() => Int, { nullable: true })
  id: number;
  @Field()
  createdAt: String!;
  @Field()
  updatedAt: String!;
  @Field()
  paymentOne: String; //#결제1 (강사)
  @Field()
  paymentTwo: String; //#결제2 (담당직원)
  @Field()
  paymentThree: String; //#결제3 (관리자)
  @Field()
  trainingInfoOne: [String]!; //# 교시, 담당교사, 교과목명, 능력단위명, 훈련내용
  @Field()
  trainingInfoTwo: [String]!;
  @Field()
  trainingInfoThree: [String]!;
  @Field()
  trainingInfoFour: [String]!;
  @Field()
  trainingInfoFive: [String]!;
  @Field()
  trainingInfoSix: [String]!;
  @Field()
  trainingInfoSeven: [String]!;
  @Field()
  trainingInfoEight: [String]!;
  @Field()
  trainingTimeOneday: [Int]!; //#일계 - 교양, 전공, 실습, 기타, 계
  @Field()
  trainingTimeTotal: [Int]!; //#누계 - 교양, 전공, 실습, 기타, 계
  @Field()
  instruction: String; //# 지시사항
  @Field()
  absentSt: String; //#결석학생
  @Field()
  tardySt: String; //#지각학생
  @Field()
  leaveEarlySt: String; //#조퇴학생
  @Field()
  outingSt: String; //#외출학생
  @Field()
  etc: String; //#기타사항
  @Field()
  lectures: Lectures;
  @Field()
  lecturesId: Int!;
  @Field()
  workLogsDate: String!;
  @Field()
  attendanceCount: [Int]; // #출석 카운트 [재적,출석,결석,지각,조퇴,외출]
  @Field()
  Branch: Branch;
  @Field()
  BranchId: Int;
  @Field()
  checkList: [String]!;
  @Field()
  checkContext: [String];
  @Field()
  lastModifiedTime: String; //#최근수정시간
}

//StudentMemo (수강생 메모)
@ObjectType()
export class StudentMemo {
  @Field(() => Int)
  id: number;
  @Field()
  content: string;
  @Field(() => Student, { nullable: true })
  student?: Student;
  @Field(() => Int, { nullable: true })
  studentId?: number;
  @Field(() => ManageUser, { nullable: true })
  manageUser?: ManageUser;
  @Field(() => Int, { nullable: true })
  manageUserId?: number;
  @Field({ nullable: true })
  createdAt?: string;
  @Field({ nullable: true })
  updatedAt?: string;
  @Field({ nullable: true })
  lastModifiedTime?: string;
}

@ObjectType()
export class PaymentDetail {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  cardCompany?: string; // 카드회사
  @Field({ nullable: true })
  cardNum?: string; //카드번호
  @Field(() => Int, { nullable: true })
  installment?: number; //할부개월
  @Field({ nullable: true })
  ApprovalNum?: string; //승인번호
  @Field(() => Int, { nullable: true })
  amountPayment?: number; //결제금액
  @Field(() => Int, { nullable: true })
  #unpaidPayment?: number; //미수납액
  @Field({ nullable: true })
  paymentDate?: string; //결제일
  @Field({ nullable: true })
  bankName?: string; //은행이름
  @Field({ nullable: true })
  depositorName?: string; // 입금자명
  @Field(() => Int, { nullable: true })
  depositAmount?: number; //입금금액
  @Field({ nullable: true })
  depositDate?: string; //입금일
  @Field(() => StudentPayment)
  studentPayment: StudentPayment;
  @Field(() => Int)
  studentPaymentId: number; //연결된 학생결제(StudentPayment 의 id)
  @Field(() => ManageUser, { nullable: true })
  receiver?: ManageUser;
  @Field(() => Int, { nullable: true })
  receiverId?: number;
  @Field({ nullable: true })
  accountingManager?: string;
  @Field({ nullable: true })
  reqRefund?: boolean;
  @Field({ nullable: true })
  reqRefundManager?: string; // 환불신청자
  @Field(() => Int, { nullable: true })
  reqRefundManagerId?: number; // 환불신청한 매니저 아이디
  @Field({ nullable: true })
  reqRefundDate?: string; //환불신청일
  @Field({ nullable: true })
  refundApproval?: boolean;
  @Field({ nullable: true })
  refundManager?: string; //환불승인자
  @Field({ nullable: true })
  refundApprovalDate?: string; //환불승인일
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => Int, { nullable: true })
  studentId?: number;
  @Field({ nullable: true })
  stName?: string;
  @Field(() => [String], { nullable: true })
  cashReceipts?: string[];
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field({ nullable: true })
  lastModifiedTime?: string; //최근수정시간
}

//Student (수강생)
@ObjectType()
export class Student {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  phoneNum1: string;
  @Field({ nullable: true })
  phoneNum2?: string;
  @Field()
  smsAgreement: string;
  @Field()
  writer: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => String, { nullable: true })
  birthday?: Date;
  @Field(() => ManageUser, { nullable: true })
  manager?: ManageUser;
  @Field(() => Int, { nullable: true })
  managerUserId?: number;
  @Field(() => [StudentMemo], { nullable: true })
  studentMemo?: StudentMemo[];
  @Field(() => [StudentPayment], { nullable: true })
  studentPayment?: StudentPayment[];
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
}

//StudentPayment (수강신청)
@ObjectType()
export class StudentPayment {
  @Field(() => Int)
  id: number;
  @Field(() => Int, { nullable: true })
  seScore?: number;
  @Field(() => Int, { nullable: true })
  tuitionFee?: number;
  @Field({ nullable: true })
  discountAmount?: string;
  @Field(() => Int, { nullable: true })
  cashAmount?: number;
  @Field(() => Int, { nullable: true })
  cardAmount?: number;
  @Field(() => Int, { nullable: true })
  actualAmount?: number;
  @Field(() => Int, { nullable: true })
  unCollectedAmount?: number;
  @Field(() => [String], { nullable: true })
  receiptClassification?: string[];
  @Field({ nullable: true })
  paymentDate?: string;
  @Field(() => Student, { nullable: true })
  student?: Student;
  @Field(() => Int)
  studentId: number;
  @Field(() => [PaymentDetail], { nullable: true })
  paymentDetail?: PaymentDetail[];
  @Field(() => ManageUser, { nullable: true })
  processingManager?: ManageUser;
  @Field(() => Int, { nullable: true })
  processingManagerId?: number;
  @Field({ nullable: true })
  situationReport?: boolean;
  @Field(() => Int, { nullable: true })
  amountReceived?: number;
  @Field(() => Subject, { nullable: true })
  subject?: Subject;
  @Field(() => Int, { nullable: true })
  subjectId?: number;
  @Field({ nullable: true })
  campus?: string;
  @Field({ nullable: true })
  subDiv?: string;
  @Field({ nullable: true })
  courseComplete?: string;
  @Field({ nullable: true })
  employment?: string;
  @Field({ nullable: true })
  dueDate?: string;
  @Field({ nullable: true })
  classCode?: string;
  @Field({ nullable: true })
  lectureAssignment?: string;
  @Field({ nullable: true })
  createdAt?: string;
  @Field({ nullable: true })
  updatedAt?: string;
  @Field({ nullable: true })
  isWeekend?: string;
  @Field(() => [Attendance], { nullable: true })
  attendance?: Attendance[];
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field({ nullable: true })
  mZipCode?: string;
  @Field({ nullable: true })
  mAddresses?: string;
  @Field({ nullable: true })
  mAddressDetail?: string;
  @Field({ nullable: true })
  dateOfDroppingOut?: string;
  @Field({ nullable: true })
  reasonFordroppingOut?: string;
  @Field(() => [EmploymentStatus], { nullable: true })
  EmploymentStatus?: EmploymentStatus[];
  @Field(() => [EduInfomation], { nullable: true })
  EduInfomation?: EduInfomation[];
  @Field(() => [Career], { nullable: true })
  Career?: Career[];
  @Field(() => [Certificate], { nullable: true })
  Certificate?: Certificate[];
  @Field(() => [StudentConsultation], { nullable: true })
  StudentConsultation?: StudentConsultation[];
  @Field(() => [HopeForEmployment], { nullable: true })
  HopeForEmployment?: HopeForEmployment[];
  @Field(() => [EmploymentRecommendation], { nullable: true })
  EmploymentRecommendation?: [EmploymentRecommendation];
  @Field(() => [PreInspection], { nullable: true })
  PreInspection?: PreInspection[];
  @Field(() => [StudentPortfolio], { nullable: true })
  StudentPortfolio?: StudentPortfolio[];
  @Field({ nullable: true })
  supportType?: string;
  @Field({ nullable: true })
  lastModifiedTime?: string;
  @Field({ nullable: true })
  lastModifiedByName?: string;
  @Field({ nullable: true })
  lastModifiedByUserId?: string;
}

//StudentState (상담관리)
@ObjectType()
export class StudentState {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  campus?: string;
  @Field({ nullable: true })
  category?: string;
  @Field()
  stName: string;
  @Field()
  phoneNum1: string;
  @Field({ nullable: true })
  phoneNum2?: string;
  @Field({ nullable: true })
  phoneNum3?: string;
  @Field(() => ManageUser, { nullable: true })
  currentManager?: ManageUser;
  @Field(() => Int, { nullable: true })
  currentManagerInt?: number;
  @Field(() => [String], { nullable: true })
  subject?: string[];
  @Field({ nullable: true })
  detail?: string;
  @Field()
  agreement: string;
  @Field(() => Int)
  progress: number;
  @Field({ nullable: true })
  stEmail?: string;
  @Field({ nullable: true })
  stAddr?: string;
  @Field({ nullable: true })
  subDiv?: string;
  @Field(() => String, { nullable: true })
  stVisit?: Date;
  @Field(() => String, { nullable: true })
  expEnrollDate?: Date;
  @Field({ nullable: true })
  perchase?: boolean;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field({ nullable: true })
  receiptDiv?: string;
  @Field({ nullable: true })
  pic?: string; // 기본값 설정이 가능하면 설정
  @Field(() => [String], { nullable: true })
  classMethod?: string[];
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => [AdviceType], { nullable: true })
  adviceTypes?: AdviceType[];
}

//분야관리
@ObjectType()
export class AdviceType {
  @Field(() => Int)
  id: number;
  @Field()
  type: string;
  @Field(() => Int)
  indexNum: number;
  @Field({ nullable: true })
  category?: string;
  @Field({ nullable: true })
  onOff?: string;
  @Field({ nullable: true })
  defaultValue?: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => [StudentState], { nullable: true })
  studentStates?: StudentState[];
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
}

//상담메모
@ObjectType()
export class ConsultationMemo {
  @Field(() => Int)
  id: number;
  @Field()
  content: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => StudentState, { nullable: true })
  studentState?: StudentState;
  @Field(() => Int, { nullable: true })
  studentStateId?: number;
  @Field(() => ManageUser, { nullable: true })
  manageUser?: ManageUser;
  @Field(() => Int, { nullable: true })
  manageUserId?: number;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field({ nullable: true })
  lastModifiedTime?: string;
}

//PermisionsGranted(권한)
@ObjectType()
export class PermissionsGranted {
  @Field(() => Int)
  id: number;
  @Field()
  permissionName: string;
  @Field({ nullable: true })
  topic: string;
  @Field(() => [ManageUser], { nullable: true })
  ManageUser?: ManageUser[];
  @Field({ nullable: true })
  smsPermitted: string;
  @Field({ nullable: true })
  readOnly: string;
  @Field({ nullable: true })
  allPermitted: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime: Date;
}

@ObjectType()
export class Alarm {
  @Field(() => Int)
  id: number;
  @Field()
  title: string;
  @Field()
  content: string;
  @Field(() => [Int], { nullable: true })
  personalTarget?: number[];
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
}
