import { Module } from "@nestjs/common";
import { CreateStudentModule } from "./create-student/create-student.module";
import { EditStudentModule } from "./edit-student/edit-student.module";
import { DeleteStudentModule } from './delete-student/delete-student.module';

@Module({
  imports: [CreateStudentModule, EditStudentModule, DeleteStudentModule],
})
export class StudentModule {}
