import { Module } from "@nestjs/common";
import { SearchPermissionsGrantedService } from "./search-permissions-granted.service";
import { SearchPermissionsGrantedResolver } from "./search-permissions-granted.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";
import { PermissionsGrantedResolver } from "./permissionsGranted.resolver";
import { PermissionsGrantedService } from "./permissionsGranted.service";

@Module({
  imports: [PrismaModule],
  providers: [
    SearchPermissionsGrantedService,
    SearchPermissionsGrantedResolver,
    PermissionsGrantedResolver,
    PermissionsGrantedService,
  ],
})
export class SearchPermissionsGrantedModule {}
