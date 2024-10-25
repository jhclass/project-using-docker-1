import { Module } from "@nestjs/common";
import { CreatePermissionsGrantedModule } from "./create-permissions-granted/create-permissions-granted.module";
import { EditPermissionsGrantedModule } from "./edit-permissions-granted/edit-permissions-granted.module";
import { DeletePermissionsGrantedModule } from "./delete-permissions-granted/delete-permissions-granted.module";
import { SearchPermissionsGrantedModule } from "./search-permissions-granted/search-permissions-granted.module";

@Module({
  imports: [
    CreatePermissionsGrantedModule,
    EditPermissionsGrantedModule,
    DeletePermissionsGrantedModule,
    SearchPermissionsGrantedModule,
  ],
})
export class PermissionsGrantedModule {}
