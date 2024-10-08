import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { DeleteManageUserResolver } from "./delete-manage-user.resolver";
import { DeleteManageUserService } from "./delete-manage-user.service";

@Module({
  imports: [PrismaModule],
  providers: [DeleteManageUserResolver, DeleteManageUserService],
})
export class DeleteManageUserModule {}
