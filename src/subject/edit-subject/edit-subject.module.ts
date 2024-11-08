import { Module } from "@nestjs/common";
import { EditSubjectResolver } from "./edit-subject.resolver";
import { EditSubjectService } from "./edit-subject.service";
import { PrismaModule } from "@src/prisma/prisma.module";
@Module({
  imports: [PrismaModule],
  providers: [EditSubjectResolver, EditSubjectService],
})
export class EditSubjectModule {}
