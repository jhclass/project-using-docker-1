import { Module } from "@nestjs/common";
import { CreatePreInspectionModule } from "./create-pre-inspection/create-pre-inspection.module";
import { EditPreInspectionModule } from "./edit-pre-inspection/edit-pre-inspection.module";
import { DeletePreInspectionModule } from "./delete-pre-inspection/delete-pre-inspection.module";

@Module({
  imports: [
    CreatePreInspectionModule,
    EditPreInspectionModule,
    DeletePreInspectionModule,
  ],
})
export class PreInspectionModule {}
