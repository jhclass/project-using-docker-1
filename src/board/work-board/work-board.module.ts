import { Module } from "@nestjs/common";
import { CreateWorkBoardModule } from "./create-work-board/create-work-board.module";
import { SeeWorkBoardModule } from "./see-work-board/see-work-board.module";
import { SearchWorkBoardModule } from "./search-work-board/search-work-board.module";

@Module({
  imports: [CreateWorkBoardModule, SeeWorkBoardModule, SearchWorkBoardModule],
})
export class WorkBoardModule {}
