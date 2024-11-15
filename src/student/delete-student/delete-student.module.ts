import { Module } from "@nestjs/common";
import { DeleteStudentResolver } from "./delete-student.resolver";
import { DeleteStudentService } from "./delete-student.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteStudentResolver, DeleteStudentService],
})
export class DeleteStudentModule {}
