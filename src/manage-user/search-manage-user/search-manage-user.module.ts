import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { SearchManageUserResolver } from "@src/manage-user/search-manage-user/search-manage-user.resolver";
import { SearchManageUserService } from "@src/manage-user/search-manage-user/search-manage-user.service";

@Module({
  imports: [PrismaModule],
  providers: [SearchManageUserResolver, SearchManageUserService],
})
export class SearchManageUserModule {}
