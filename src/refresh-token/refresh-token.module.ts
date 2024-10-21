import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { RefreshTokenResolver } from "./refresh-token.resolver";
import { RefreshTokenService } from "./refresh-token.service";

@Module({
  imports: [PrismaModule],
  providers: [RefreshTokenResolver, RefreshTokenService],
})
export class RefreshTokenModule {}
