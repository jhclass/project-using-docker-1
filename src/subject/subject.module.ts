import { Module } from "@nestjs/common";
import { CreateSubjectModule } from "./create-subject/create-subject.module";
import { EditSubjectModule } from "./edit-subject/edit-subject.module";
import { DeleteSubjectModule } from "./delete-subject/delete-subject.module";
import { SearchSubjectModule } from "./search-subject/search-subject.module";
import { SeeSubjectModule } from "./see-subject/see-subject.module";

@Module({
  imports: [
    CreateSubjectModule,
    EditSubjectModule,
    DeleteSubjectModule,
    SearchSubjectModule,
    SeeSubjectModule,
  ],
})
export class SubjectModule {}
