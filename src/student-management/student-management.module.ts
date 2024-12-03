import { Module } from "@nestjs/common";
import { AcademyRecordModule } from "./academy-record/academy-record.module";

@Module({
  imports: [AcademyRecordModule],
})
export class StudentManagementModule {}
