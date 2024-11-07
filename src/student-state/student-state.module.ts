import { Module } from "@nestjs/common";
import { CreateStudentStateModule } from "./create-student-state/create-student-state.module";
import { EditStudentStateModule } from "./edit-student-state/edit-student-state.module";
import { SeeStudentStateModule } from "./see-student-state/see-student-state.module";
import { SeeFavoriteModule } from "./see-favorite/see-favorite.module";
import { UpdateFavoriteModule } from "./update-favorite/update-favorite.module";
import { ConsultationMemoModule } from "./consultation-memo/consultation-memo.module";
import { DeleteStudentStateModule } from "./delete-student-state/delete-student-state.module";
import { SearchStudentStateModule } from "./search-student-state/search-student-state.module";

@Module({
  imports: [
    CreateStudentStateModule,
    EditStudentStateModule,
    SeeStudentStateModule,
    SeeFavoriteModule,
    UpdateFavoriteModule,
    ConsultationMemoModule,
    DeleteStudentStateModule,
    SearchStudentStateModule,
  ],
})
export class StudentStateModule {}
