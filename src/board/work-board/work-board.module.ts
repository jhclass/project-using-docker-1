import { Module } from "@nestjs/common";
import { CreateWorkBoardModule } from "./create-work-board/create-work-board.module";
import { SeeWorkBoardModule } from "./see-work-board/see-work-board.module";

@Module({
  imports: [CreateWorkBoardModule, SeeWorkBoardModule],
})
export class WorkBoardModule {}
