import { Module } from "@nestjs/common";
import { CreateLecturesModule } from "./create-lectures/create-lectures.module";
import { EditLecturesModule } from "./edit-lectures/edit-lectures.module";
import { DeleteLecturesModule } from "./delete-lectures/delete-lectures.module";
import { SeeLecturesModule } from "./see-lectures/see-lectures.module";
import { SearchLecturesModule } from "./search-lectures/search-lectures.module";
import { DuplicateCheckModule } from "./duplicate-check/duplicate-check.module";
import { ClassCancellationModule } from "./class-cancellation/class-cancellation.module";

@Module({
  imports: [
    CreateLecturesModule,
    EditLecturesModule,
    DeleteLecturesModule,
    SeeLecturesModule,
    SearchLecturesModule,
    DuplicateCheckModule,
    ClassCancellationModule,
  ],
})
export class LectureModule {}
