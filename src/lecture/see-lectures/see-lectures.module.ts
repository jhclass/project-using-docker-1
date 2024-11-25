import { Module } from "@nestjs/common";
import { SeeLecturesResolver } from "./see-lectures.resolver";
import { SeeLecturesService } from "./see-lectures.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeLecturesResolver, SeeLecturesService],
})
export class SeeLecturesModule {}
