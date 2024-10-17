import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { CreateBranchResolver } from "./create-branch.resolver";
import { CreateBranchService } from "./create-branch.service";

@Module({
  imports: [PrismaModule],
  providers: [CreateBranchResolver, CreateBranchService],
})
export class CreateBranchModule {}
