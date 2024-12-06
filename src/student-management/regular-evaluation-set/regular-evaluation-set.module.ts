import { Module } from "@nestjs/common";
import { CreateRegularEvaluationSetModule } from "./create-regular-evaluation-set/create-regular-evaluation-set.module";
import { EditRegularEvaluationSetModule } from "./edit-regular-evaluation-set/edit-regular-evaluation-set.module";
import { DeleteRegularEvaluationSetModule } from "./delete-regular-evaluation-set/delete-regular-evaluation-set.module";
import { SeeRegularEvaluationSetModule } from "./see-regular-evaluation-set/see-regular-evaluation-set.module";

@Module({
  imports: [
    CreateRegularEvaluationSetModule,
    EditRegularEvaluationSetModule,
    DeleteRegularEvaluationSetModule,
    SeeRegularEvaluationSetModule,
  ],
})
export class RegularEvaluationSetModule {}
