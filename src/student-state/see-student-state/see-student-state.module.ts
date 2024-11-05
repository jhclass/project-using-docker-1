import { Module } from "@nestjs/common";
import { SeeStudentStateService } from "./see-student-state.service";
import { SeeStudentStateResolver } from "./see-student-state.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeStudentStateService, SeeStudentStateResolver],
})
export class SeeStudentStateModule {}
