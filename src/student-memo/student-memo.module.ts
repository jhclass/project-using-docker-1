import { Module } from "@nestjs/common";
import { CreateStudentMemoModule } from "./create-student-memo/create-student-memo.module";
import { EditStudentMemoModule } from "./edit-student-memo/edit-student-memo.module";
import { DeleteStudentMemoModule } from "./delete-student-memo/delete-student-memo.module";

@Module({
  imports: [
    CreateStudentMemoModule,
    EditStudentMemoModule,
    DeleteStudentMemoModule,
  ],
})
export class StudentMemoModule {}
