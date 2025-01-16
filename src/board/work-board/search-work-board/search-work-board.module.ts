import { Module } from "@nestjs/common";
import { SearchWorkBoardResolver } from "./search-work-board.resolver";
import { SearchWorkBoardService } from "./search-work-board.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchWorkBoardResolver, SearchWorkBoardService],
})
export class SearchWorkBoardModule {}
