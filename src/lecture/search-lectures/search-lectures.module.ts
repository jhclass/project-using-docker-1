import { Module } from "@nestjs/common";
import { SearchLecturesResolver } from "./search-lectures.resolver";
import { SearchLecturesService } from "./search-lectures.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchLecturesResolver, SearchLecturesService],
})
export class SearchLecturesModule {}
