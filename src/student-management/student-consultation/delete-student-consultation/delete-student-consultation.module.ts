import { Module } from "@nestjs/common";
import { DeleteStudentConsultationResolver } from "./delete-student-consultation.resolver";
import { DeleteStudentConsultationService } from "./delete-student-consultation.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    DeleteStudentConsultationResolver,
    DeleteStudentConsultationService,
  ],
})
export class DeleteStudentConsultationModule {}
