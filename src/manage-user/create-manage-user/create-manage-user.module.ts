import { Module } from "@nestjs/common";
import { CreateManageUserResolver } from "./create-manage-user.resolver";
import { CreateManageUserService } from "./create-manage-user.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateManageUserResolver, CreateManageUserService],
})
export class CreateManageUserModule {}
