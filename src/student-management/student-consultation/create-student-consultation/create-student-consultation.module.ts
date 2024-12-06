import { Module } from "@nestjs/common";
import { CreateStudentConsultationResolver } from "./create-student-consultation.resolver";
import { CreateStudentConsultationService } from "./create-student-consultation.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    CreateStudentConsultationResolver,
    CreateStudentConsultationService,
  ],
})
export class CreateStudentConsultationModule {}
