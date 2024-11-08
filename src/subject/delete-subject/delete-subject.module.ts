import { Module } from "@nestjs/common";
import { DeleteSubjectResolver } from "./delete-subject.resolver";
import { DeleteSubjectService } from "./delete-subject.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteSubjectResolver, DeleteSubjectService],
})
export class DeleteSubjectModule {}
