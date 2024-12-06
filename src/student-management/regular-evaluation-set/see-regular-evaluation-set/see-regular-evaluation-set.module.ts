import { Module } from "@nestjs/common";
import { SeeRegularEvaluationSetResolver } from "./see-regular-evaluation-set.resolver";
import { SeeRegularEvaluationSetService } from "./see-regular-evaluation-set.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeRegularEvaluationSetResolver, SeeRegularEvaluationSetService],
})
export class SeeRegularEvaluationSetModule {}
