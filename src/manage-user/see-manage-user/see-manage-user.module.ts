import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { SeeManageUserService } from "./see-manage-user.service";
import { SeeManageUserResolver } from "./see-manage-user.resolver";

@Module({
  imports: [PrismaModule],
  providers: [SeeManageUserService, SeeManageUserResolver],
})
export class SeeManageUserModule {}
