import { Module } from "@nestjs/common";
import { CreateManageUserResolver } from "./create-manage-user.resolver";
import { CreateManageUserService } from "./create-manage-user.service";
import { PrismaModule } from "@src/prisma/prisma.module";
import { CreateMasterUserResolver } from "./create-master-user.resolver";
import { CreateMasterUserService } from "./create-master-user.service";

@Module({
  imports: [PrismaModule],
  providers: [
    CreateManageUserResolver,
    CreateManageUserService,
    CreateMasterUserResolver,
    CreateMasterUserService,
  ],
})
export class CreateManageUserModule {}
