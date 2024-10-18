import { Module } from "@nestjs/common";
import { CreateManageUserModule } from "./create-manage-user/create-manage-user.module";
import { EditManageUserModule } from "./edit-manage-user/edit-manage-user.module";
import { DeleteManageUserModule } from "./delete-manage-user/delete-manage-user.module";
import { SearchManageUserModule } from "./search-manage-user/search-manage-user.module";
import { SeeManageUserModule } from "./see-manage-user/see-manage-user.module";

@Module({
  imports: [
    CreateManageUserModule,
    EditManageUserModule,
    DeleteManageUserModule,
    SearchManageUserModule,
    SeeManageUserModule,
  ],
})
export class ManageUserModule {}
