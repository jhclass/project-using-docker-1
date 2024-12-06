import { Module } from "@nestjs/common";
import { DeleteRegularEvaluationSetResolver } from "./delete-regular-evaluation-set.resolver";
import { DeleteRegularEvaluationSetService } from "./delete-regular-evaluation-set.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    DeleteRegularEvaluationSetResolver,
    DeleteRegularEvaluationSetService,
  ],
})
export class DeleteRegularEvaluationSetModule {}
