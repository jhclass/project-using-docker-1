import { Module } from "@nestjs/common";
import { DeleteStudentMemoResolver } from "./delete-student-memo.resolver";
import { DeleteStudentMemoService } from "./delete-student-memo.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteStudentMemoResolver, DeleteStudentMemoService],
})
export class DeleteStudentMemoModule {}
