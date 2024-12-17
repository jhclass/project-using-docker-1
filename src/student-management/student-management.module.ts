import { Module } from "@nestjs/common";
import { AcademyRecordModule } from "./academy-record/academy-record.module";
import { CareerModule } from "./career/career.module";
import { CertificateModule } from "./certificate/certificate.module";
import { EduInfomationModule } from "./edu-infomation/edu-infomation.module";
import { CreateEmploymentRecommendationModule } from "./employment-recommendation/create-employment-recommendation/create-employment-recommendation.module";
import { EditEmploymentRecommendationModule } from "./employment-recommendation/edit-employment-recommendation/edit-employment-recommendation.module";
import { DeleteEmploymentRecommendationModule } from "./employment-recommendation/delete-employment-recommendation/delete-employment-recommendation.module";
import { EmploymentStatusModule } from "./employment-status/employment-status.module";
import { HopeForEmploymentModule } from "./hope-for-employment/hope-for-employment.module";
import { PreInspectionModule } from "./pre-inspection/pre-inspection.module";
import { RegularEvaluationSetModule } from "./regular-evaluation-set/regular-evaluation-set.module";
import { StudentConsultationModule } from "./student-consultation/student-consultation.module";
import { StudentPortfolioModule } from "./student-portfolio/student-portfolio.module";
import { SearchSmModule } from "./search-sm/search-sm.module";

@Module({
  imports: [
    AcademyRecordModule,
    CareerModule,
    CertificateModule,
    EduInfomationModule,
    CreateEmploymentRecommendationModule,
    EditEmploymentRecommendationModule,
    DeleteEmploymentRecommendationModule,
    EmploymentStatusModule,
    HopeForEmploymentModule,
    PreInspectionModule,
    RegularEvaluationSetModule,
    StudentConsultationModule,
    StudentPortfolioModule,
    SearchSmModule,
  ],
})
export class StudentManagementModule {}
