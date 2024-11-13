import { Module } from "@nestjs/common";
import { CreateStudentResolver } from "./create-student.resolver";
import { CreateStudentService } from "./create-student.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateStudentResolver, CreateStudentService],
})
export class CreateStudentModule {}
