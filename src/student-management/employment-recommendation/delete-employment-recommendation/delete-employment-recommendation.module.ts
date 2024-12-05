import { Module } from "@nestjs/common";
import { DeleteEmploymentRecommendationResolver } from "./delete-employment-recommendation.resolver";
import { DeleteEmploymentRecommendationService } from "./delete-employment-recommendation.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    DeleteEmploymentRecommendationResolver,
    DeleteEmploymentRecommendationService,
  ],
})
export class DeleteEmploymentRecommendationModule {}
