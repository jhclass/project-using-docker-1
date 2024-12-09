import { createUnionType } from "@nestjs/graphql";
import { Career } from "./career.dto";
import { EduInfomation } from "./eduInfomation.dto";
import { StudentConsultation } from "./studentConsultation.dto";
import { Certificate } from "./certificate.dto";
import { HopeForEmployment } from "./hopeForEmployment.dto";
import { EmploymentRecommendation } from "./employmentRecommendation.dto";
import { EmploymentStatus } from "./employmentStatus.dto";
import { PreInspection } from "./preInspection.dto";
import { StudentPortfolio } from "./studentPorfolio.dto";

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
