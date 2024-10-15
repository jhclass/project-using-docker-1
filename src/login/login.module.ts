import { Module } from "@nestjs/common";
import { LoginResolver } from "@src/login/login.resolver";
import { LoginService } from "@src/login/login.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [LoginResolver, LoginService],
})
export class LoginModule {}
