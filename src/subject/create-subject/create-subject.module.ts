import { Module } from "@nestjs/common";
import { CreateSubjectResolver } from "./create-subject.resolver";
import { CreateSubjectService } from "./create-subject.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateSubjectResolver, CreateSubjectService],
})
export class CreateSubjectModule {}
