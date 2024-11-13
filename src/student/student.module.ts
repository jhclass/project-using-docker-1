import { Module } from "@nestjs/common";
import { CreateStudentModule } from "./create-student/create-student.module";

@Module({
  imports: [CreateStudentModule],
})
export class StudentModule {}
