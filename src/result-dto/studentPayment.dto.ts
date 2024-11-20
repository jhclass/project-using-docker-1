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
  @Field(() => [String], { nullable: "itemsAndList" })
  receiptClassification?: string[];
  @Field(() => String, { nullable: true })
  paymentDate?: Date;
  @Field(() => Student, { nullable: true })
  student?: Student;
  @Field(() => Int)
  studentId: number;
  @Field(() => [PaymentDetail], { nullable: "itemsAndList" })
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
  @Field(() => String, { nullable: true })
  dueDate?: Date;
  @Field({ nullable: true })
  classCode?: string;
  @Field({ nullable: true })
  lectureAssignment?: string;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field({ nullable: true })
  isWeekend?: string;
  @Field(() => [Attendance], { nullable: "itemsAndList" })
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
  @Field(() => String, { nullable: true })
  dateOfDroppingOut?: Date;
  @Field({ nullable: true })
  reasonFordroppingOut?: string;
  @Field(() => [EmploymentStatus], { nullable: "itemsAndList" })
  EmploymentStatus?: EmploymentStatus[];
  @Field(() => [EduInfomation], { nullable: "itemsAndList" })
  EduInfomation?: EduInfomation[];
  @Field(() => [Career], { nullable: "itemsAndList" })
  Career?: Career[];
  @Field(() => [Certificate], { nullable: "itemsAndList" })
  Certificate?: Certificate[];
  @Field(() => [StudentConsultation], { nullable: "itemsAndList" })
  StudentConsultation?: StudentConsultation[];
  @Field(() => [HopeForEmployment], { nullable: "itemsAndList" })
  HopeForEmployment?: HopeForEmployment[];
  @Field(() => [EmploymentRecommendation], { nullable: "itemsAndList" })
  EmploymentRecommendation?: EmploymentRecommendation[];
  @Field(() => [PreInspection], { nullable: "itemsAndList" })
  PreInspection?: PreInspection[];
  @Field(() => [StudentPortfolio], { nullable: "itemsAndList" })
  StudentPortfolio?: StudentPortfolio[];
  @Field({ nullable: true })
  supportType?: string;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field({ nullable: true })
  lastModifiedByName?: string;
  @Field({ nullable: true })
  lastModifiedByUserId?: string;
}
