import { Module } from "@nestjs/common";
import { DeleteStudentStateResolver } from "./delete-student-state.resolver";
import { DeleteStudentStateService } from "./delete-student-state.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteStudentStateResolver, DeleteStudentStateService],
})
export class DeleteStudentStateModule {}
