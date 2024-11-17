import { Module } from "@nestjs/common";
import { SearchStudentResolver } from "./search-student.resolver";
import { SearchStudentService } from "./search-student.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchStudentResolver, SearchStudentService],
})
export class SearchStudentModule {}
