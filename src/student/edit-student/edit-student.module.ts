import { Module } from "@nestjs/common";
import { EditStudentResolver } from "./edit-student.resolver";
import { EditStudentService } from "./edit-student.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditStudentResolver, EditStudentService],
})
export class EditStudentModule {}
