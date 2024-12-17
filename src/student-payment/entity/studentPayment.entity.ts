import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Student } from "../../student/entity/student.entity";

import { Subject } from "../../subject/entity/subject.entity";
import { Attendance } from "../../attendance/entity/attendance.entity";

import { EmploymentStatus } from "../../student-management/employment-status/entity/employmentStatus.entity";
import { EduInfomation } from "../../student-management/edu-infomation/entity/eduInfomation.entity";
import { Certificate } from "../../student-management/certificate/entity/certificate.entity";
import { StudentConsultation } from "../../student-management/student-consultation/entity/studentConsultation.entity";
import { HopeForEmployment } from "../../student-management/hope-for-employment/entity/hopeForEmployment.entity";
import { EmploymentRecommendation } from "../../student-management/employment-recommendation/entity/employmentRecommendation.entity";
import { PreInspection } from "../../student-management/pre-inspection/entity/preInspection.entity";
import { StudentPortfolio } from "../../student-management/student-portfolio/entity/studentPorfolio.entity";
import { PaymentDetail } from "../../payment-detail/entity/paymentDetail.entity";
import { ManageUser } from "../../manage-user/entity/manageUser.entity";
import { Branch } from "../../branch/entity/branch.entity";
import { Career } from "../../student-management/career/entity/career.entity";
import { CommonResponse } from "@src/common-entity/common-response.entity";

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
