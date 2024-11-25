import { Module } from "@nestjs/common";
import { CreateStudentMemoResolver } from "./create-student-memo.resolver";
import { CreateStudentMemoService } from "./create-student-memo.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateStudentMemoResolver, CreateStudentMemoService],
})
export class CreateStudentMemoModule {}
