import { Module } from "@nestjs/common";
import { DeleteStudentPortfolioResolver } from "./delete-student-portfolio.resolver";
import { DeleteStudentPortfolioService } from "./delete-student-portfolio.service";
import { PrismaModule } from "@src/prisma/prisma.module";
import { S3Service } from "@src/s3/s3.service";

@Module({
  imports: [PrismaModule],
  providers: [
    DeleteStudentPortfolioResolver,
    DeleteStudentPortfolioService,
    S3Service,
  ],
})
export class DeleteStudentPortfolioModule {}
