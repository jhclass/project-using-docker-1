import { Module } from "@nestjs/common";
import { CreateWorkBoardResolver } from "./create-work-board.resolver";
import { CreateWorkBoardService } from "./create-work-board.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateWorkBoardResolver, CreateWorkBoardService],
})
export class CreateWorkBoardModule {}
