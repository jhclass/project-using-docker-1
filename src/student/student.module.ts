import { Module } from "@nestjs/common";
import { CreateStudentModule } from "./create-student/create-student.module";
import { EditStudentModule } from "./edit-student/edit-student.module";
import { DeleteStudentModule } from "./delete-student/delete-student.module";
import { SeeStudentModule } from "./see-student/see-student.module";
import { SearchStudentModule } from "./search-student/search-student.module";
import { StudentMemoModule } from "@src/student-memo/student-memo.module";

@Module({
  imports: [
    CreateStudentModule,
    EditStudentModule,
    DeleteStudentModule,
    SeeStudentModule,
    SearchStudentModule,
    StudentMemoModule,
  ],
})
export class StudentModule {}
