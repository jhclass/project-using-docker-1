import { Module } from "@nestjs/common";
import { CreateWorkBoardResolver } from "./create-work-board.resolver";
import { CreateWorkBoardService } from "./create-work-board.service";
import { PrismaModule } from "@src/prisma/prisma.module";
import { S3Service } from "@src/s3/s3.service";

@Module({
  imports: [PrismaModule],
  providers: [CreateWorkBoardResolver, CreateWorkBoardService, S3Service],
})
export class CreateWorkBoardModule {}
