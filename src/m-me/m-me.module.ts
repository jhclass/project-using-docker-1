import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { MMeResolver } from "./m-me.resolver";
import { MMeService } from "./m-me.service";

@Module({
  imports: [PrismaModule],
  providers: [MMeResolver, MMeService],
})
export class MMeModule {}
