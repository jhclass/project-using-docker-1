import { Module } from "@nestjs/common";
import { CreateRegularEvaluationSetResolver } from "./create-regular-evaluation-set.resolver";
import { CreateRegularEvaluationSetService } from "./create-regular-evaluation-set.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    CreateRegularEvaluationSetResolver,
    CreateRegularEvaluationSetService,
  ],
})
export class CreateRegularEvaluationSetModule {}
