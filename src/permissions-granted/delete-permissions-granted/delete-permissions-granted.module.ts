import { Module } from "@nestjs/common";
import { DeletePermissionsGrantedService } from "./delete-permissions-granted.service";
import { DeletePermissionsGrantedResolver } from "./delete-permissions-granted.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    DeletePermissionsGrantedService,
    DeletePermissionsGrantedResolver,
  ],
})
export class DeletePermissionsGrantedModule {}
