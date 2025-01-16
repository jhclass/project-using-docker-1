import { Module } from "@nestjs/common";
import { WorkBoardModule } from "./work-board/work-board.module";

@Module({
  imports: [WorkBoardModule],
})
export class BoardModule {}
