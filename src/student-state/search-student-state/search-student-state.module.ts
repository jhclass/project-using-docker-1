import { Module } from "@nestjs/common";
import { SearchStudentStateResolver } from "./search-student-state.resolver";
import { SearchStudentStateService } from "./search-student-state.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchStudentStateResolver, SearchStudentStateService],
})
export class SearchStudentStateModule {}
