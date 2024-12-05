import { Module } from "@nestjs/common";
import { EditEmploymentRecommendationResolver } from "./edit-employment-recommendation.resolver";
import { EditEmploymentRecommendationService } from "./edit-employment-recommendation.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    EditEmploymentRecommendationResolver,
    EditEmploymentRecommendationService,
  ],
})
export class EditEmploymentRecommendationModule {}
