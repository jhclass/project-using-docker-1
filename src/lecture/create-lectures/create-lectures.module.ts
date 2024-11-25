import { Module } from "@nestjs/common";
import { CreateLecturesResolver } from "./create-lectures.resolver";
import { CreateLecturesService } from "./create-lectures.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateLecturesResolver, CreateLecturesService],
})
export class CreateLecturesModule {}
