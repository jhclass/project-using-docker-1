import { Module } from "@nestjs/common";
import { CreateStudentPortfolioResolver } from "./create-student-portfolio.resolver";
import { CreateStudentPortfolioService } from "./create-student-portfolio.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateStudentPortfolioResolver, CreateStudentPortfolioService],
})
export class CreateStudentPortfolioModule {}
