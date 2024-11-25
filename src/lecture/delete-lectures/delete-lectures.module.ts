import { Module } from "@nestjs/common";
import { DeleteLecturesResolver } from "./delete-lectures.resolver";
import { DeleteLecturesService } from "./delete-lectures.service";
import { PrismaModule } from "@src/prisma/prisma.module";
import { S3Service } from "@src/s3/s3.service";

@Module({
  imports: [PrismaModule],
  providers: [DeleteLecturesResolver, DeleteLecturesService, S3Service],
})
export class DeleteLecturesModule {}
