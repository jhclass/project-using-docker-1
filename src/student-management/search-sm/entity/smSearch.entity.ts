import { createUnionType, Field, Int, ObjectType } from "@nestjs/graphql";
import { Career } from "../../career/entity/career.entity";
import { EduInfomation } from "../../edu-infomation/entity/eduInfomation.entity";
import { StudentConsultation } from "../../student-consultation/entity/studentConsultation.entity";
import { Certificate } from "../../certificate/entity/certificate.entity";
import { HopeForEmployment } from "../../hope-for-employment/entity/hopeForEmployment.entity";
import { EmploymentRecommendation } from "../../employment-recommendation/entity/employmentRecommendation.entity";
import { EmploymentStatus } from "../../employment-status/entity/employmentStatus.entity";
import { PreInspection } from "../../pre-inspection/entity/preInspection.entity";
import { StudentPortfolio } from "../../student-portfolio/entity/studentPorfolio.entity";
import { CommonResponse } from "@src/common-entity/common-response.entity";

export const SearchDataUnion = createUnionType({
  name: "SearchDataUnion",
  types: () =>
    [
      Career,
      EduInfomation,
      Certificate,
      StudentConsultation,
      HopeForEmployment,
      EmploymentRecommendation,
      EmploymentStatus,
      PreInspection,
      StudentPortfolio,
    ] as const,
  resolveType(value) {
    if (value.careerDetails) return Career;
    if (value.eduName) return EduInfomation;
    if (value.certificateName) return Certificate;
    if (value.typeOfConsultation) return StudentConsultation;
    if (value.fieldOfHope) return HopeForEmployment;
    if (value.recruitmentField) return EmploymentRecommendation;
    if (value.companyName) return EmploymentStatus;
    if (value.dateOfPreInspection) return PreInspection;
    if (Array.isArray(value.filePath) && value.filePath.length > 0)
      return StudentPortfolio;
    return null;
  },
});

type SearchDataUnionType =
  | EmploymentRecommendation
  | EduInfomation
  | Certificate
  | StudentConsultation
  | HopeForEmployment
  | EmploymentRecommendation
  | PreInspection
  | StudentPortfolio
  | Career;
@ObjectType()
export class ResultSearchSM extends CommonResponse {
  @Field(() => [SearchDataUnion], { nullable: "itemsAndList" })
  data?: SearchDataUnionType[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
