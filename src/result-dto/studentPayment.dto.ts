import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Student } from "./student.dto";

import { Subject } from "./subject.dto";
import { Attendance } from "./attendance.dto";

import { EmploymentStatus } from "./employmentStatus.dto";
import { EduInfomation } from "./eduInfomation.dto";
import { Certificate } from "./certificate.dto";
import { StudentConsultation } from "./studentConsultation.dto";
import { HopeForEmployment } from "./hopeForEmployment.dto";
import { EmploymentRecommendation } from "./employmentRecommendation.dto";
import { PreInspection } from "./preInspection.dto";
import { StudentPortfolio } from "./studentPorfolio.dto";
import { PaymentDetail } from "./paymentDetail.dto";
import { ManageUser } from "./manageUser.dto";
import { Branch } from "./branch.dto";
import { Career } from "./career.dto";

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
