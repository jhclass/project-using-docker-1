import { Module } from "@nestjs/common";
import { SeeSubjectResolver } from "./see-subject.resolver";
import { SeeSubjectService } from "./see-subject.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeSubjectResolver, SeeSubjectService],
})
export class SeeSubjectModule {}
