import { Module } from "@nestjs/common";
import { CreatePermissionsGrantedResolver } from "./create-permissions-granted.resolver";
import { CreatePermissionsGrantedService } from "./create-permissions-granted.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    CreatePermissionsGrantedResolver,
    CreatePermissionsGrantedService,
  ],
})
export class CreatePermissionsGrantedModule {}
