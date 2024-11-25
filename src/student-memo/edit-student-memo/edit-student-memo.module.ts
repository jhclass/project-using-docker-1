import { Module } from "@nestjs/common";
import { EditStudentMemoResolver } from "./edit-student-memo.resolver";
import { EditStudentMemoService } from "./edit-student-memo.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditStudentMemoResolver, EditStudentMemoService],
})
export class EditStudentMemoModule {}
