import { Module } from "@nestjs/common";
import { AcademyRecordResolver } from "./academy-record.resolver";
import { AcademyRecordService } from "./academy-record.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [AcademyRecordResolver, AcademyRecordService],
})
export class AcademyRecordModule {}
