import { Module } from "@nestjs/common";
import { CreateEmploymentRecommendationResolver } from "./create-employment-recommendation.resolver";
import { CreateEmploymentRecommendationService } from "./create-employment-recommendation.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    CreateEmploymentRecommendationResolver,
    CreateEmploymentRecommendationService,
  ],
})
export class CreateEmploymentRecommendationModule {}
