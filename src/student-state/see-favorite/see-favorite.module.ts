import { Module } from "@nestjs/common";
import { SeeFavoriteService } from "./see-favorite.service";
import { SeeFavoriteResolver } from "./see-favorite.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SeeFavoriteService, SeeFavoriteResolver],
})
export class SeeFavoriteModule {}
