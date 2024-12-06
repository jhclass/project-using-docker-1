import { Module } from "@nestjs/common";
import { EditRegularEvaluationSetResolver } from "./edit-regular-evaluation-set.resolver";
import { EditRegularEvaluationSetService } from "./edit-regular-evaluation-set.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    EditRegularEvaluationSetResolver,
    EditRegularEvaluationSetService,
  ],
})
export class EditRegularEvaluationSetModule {}
