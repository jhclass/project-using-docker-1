import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [PrismaModule],
  providers: [JwtStrategy],
})
export class AuthModule {}
