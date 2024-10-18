import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { DeleteBranchResolver } from "./delete-branch.resolver";
import { DeleteBranchService } from "./delete-branch.service";

@Module({
  imports: [PrismaModule],
  providers: [DeleteBranchResolver, DeleteBranchService],
})
export class DeleteBranchModule {}
