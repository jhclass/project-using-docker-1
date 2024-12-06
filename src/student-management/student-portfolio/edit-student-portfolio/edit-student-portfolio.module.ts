import { Module } from "@nestjs/common";
import { EditStudentPortfolioResolver } from "./edit-student-portfolio.resolver";
import { EditStudentPortfolioService } from "./edit-student-portfolio.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditStudentPortfolioResolver, EditStudentPortfolioService],
})
export class EditStudentPortfolioModule {}
