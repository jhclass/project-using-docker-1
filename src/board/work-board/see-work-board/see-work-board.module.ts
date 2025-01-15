import { Module } from "@nestjs/common";
import { SeeWorkBoardResolver } from "./see-work-board.resolver";
import { SeeWorkBoardService } from "./see-work-board.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeWorkBoardResolver, SeeWorkBoardService],
})
export class SeeWorkBoardModule {}
