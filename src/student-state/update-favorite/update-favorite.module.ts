import { Module } from "@nestjs/common";
import { UpdateFavoriteService } from "./update-favorite.service";
import { UpdateFavoriteResolver } from "./update-favorite.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [UpdateFavoriteService, UpdateFavoriteResolver],
})
export class UpdateFavoriteModule {}
