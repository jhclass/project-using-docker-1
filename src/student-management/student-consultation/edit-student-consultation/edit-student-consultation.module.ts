import { Module } from "@nestjs/common";
import { EditStudentConsultationResolver } from "./edit-student-consultation.resolver";
import { EditStudentConsultationService } from "./edit-student-consultation.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditStudentConsultationResolver, EditStudentConsultationService],
})
export class EditStudentConsultationModule {}
