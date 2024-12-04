import { Module } from "@nestjs/common";
import { AcademyRecordModule } from "./academy-record/academy-record.module";
import { CareerModule } from "./career/career.module";
import { CertificateModule } from "./certificate/certificate.module";
import { EduInfomationModule } from "./edu-infomation/edu-infomation.module";

@Module({
  imports: [
    AcademyRecordModule,
    CareerModule,
    CertificateModule,
    EduInfomationModule,
  ],
})
export class StudentManagementModule {}
