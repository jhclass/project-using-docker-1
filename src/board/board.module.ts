import { Module } from "@nestjs/common";
import { CreateWorkBoardModule } from "./work-board/create-work-board/create-work-board.module";
import { SeeWorkBoardModule } from "./work-board/see-work-board/see-work-board.module";

@Module({
  imports: [CreateWorkBoardModule, SeeWorkBoardModule],
})
export class BoardModule {}
