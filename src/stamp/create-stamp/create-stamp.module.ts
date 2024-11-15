import { Module } from "@nestjs/common";
import { CreateStampResolver } from "./create-stamp.resolver";
import { CreateStampService } from "./create-stamp.service";
import { S3Service } from "@src/s3/s3.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateStampResolver, CreateStampService, S3Service],
})
export class CreateStampModule {}
