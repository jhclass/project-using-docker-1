import { Module } from "@nestjs/common";
import { EditPermissionsGrantedResolver } from "./edit-permissions-granted.resolver";
import { EditPermissionsGrantedService } from "./edit-permissions-granted.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditPermissionsGrantedResolver, EditPermissionsGrantedService],
})
export class EditPermissionsGrantedModule {}
