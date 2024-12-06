import { Module } from "@nestjs/common";
import { CreateStudentConsultationModule } from "./create-student-consultation/create-student-consultation.module";
import { EditStudentConsultationModule } from "./edit-student-consultation/edit-student-consultation.module";
import { DeleteStudentConsultationModule } from "./delete-student-consultation/delete-student-consultation.module";

@Module({
  imports: [
    CreateStudentConsultationModule,
    EditStudentConsultationModule,
    DeleteStudentConsultationModule,
  ],
})
export class StudentConsultationModule {}
