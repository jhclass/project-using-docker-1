import { Module } from "@nestjs/common";
import { SearchSubjectResolver } from "./search-subject.resolver";
import { SearchSubjectService } from "./search-subject.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchSubjectResolver, SearchSubjectService],
})
export class SearchSubjectModule {}
