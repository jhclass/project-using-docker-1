import { Module } from "@nestjs/common";
import { CreateStudentPortfolioModule } from "./create-student-portfolio/create-student-portfolio.module";
import { EditStudentPortfolioModule } from "./edit-student-portfolio/edit-student-portfolio.module";
import { DeleteStudentPortfolioModule } from "./delete-student-portfolio/delete-student-portfolio.module";

@Module({
  imports: [
    CreateStudentPortfolioModule,
    EditStudentPortfolioModule,
    DeleteStudentPortfolioModule,
  ],
})
export class StudentPortfolioModule {}
