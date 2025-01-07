import { Module } from "@nestjs/common";
import { CreateWorkBoardModule } from "./create-work-board/create-work-board.module";

@Module({
  imports: [CreateWorkBoardModule],
})
export class WorkBoardModule {}
