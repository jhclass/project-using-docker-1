import { Module } from "@nestjs/common";
import { SeeStudentResolver } from "./see-student.resolver";
import { SeeStudentService } from "./see-student.service";

import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeStudentResolver, SeeStudentService],
})
export class SeeStudentModule {}
