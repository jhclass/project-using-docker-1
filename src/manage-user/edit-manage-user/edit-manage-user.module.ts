import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { EditManageUserResolver } from "./edit-manage-user.resolver";
import { EditManageUserService } from "./edit-manage-user.service";

@Module({
  imports: [PrismaModule],
  providers: [EditManageUserResolver, EditManageUserService],
})
export class EditManageUserModule {}
