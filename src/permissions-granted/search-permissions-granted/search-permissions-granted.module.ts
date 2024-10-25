import { Module } from "@nestjs/common";
import { SearchPermissionsGrantedService } from "./search-permissions-granted.service";
import { SearchPermissionsGrantedResolver } from "./search-permissions-granted.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    SearchPermissionsGrantedService,
    SearchPermissionsGrantedResolver,
  ],
})
export class SearchPermissionsGrantedModule {}
