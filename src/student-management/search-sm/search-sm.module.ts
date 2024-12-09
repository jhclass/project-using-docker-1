import { Module } from "@nestjs/common";
import { SearchSmResolver } from "./search-sm.resolver";
import { SearchSmService } from "./search-sm.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchSmResolver, SearchSmService],
})
export class SearchSmModule {}
