import { Module } from "@nestjs/common";
import { AcademyRecordModule } from "./academy-record/academy-record.module";
import { CareerModule } from "./career/career.module";
import { CertificateModule } from "./certificate/certificate.module";

@Module({
  imports: [AcademyRecordModule, CareerModule, CertificateModule],
})
export class StudentManagementModule {}
