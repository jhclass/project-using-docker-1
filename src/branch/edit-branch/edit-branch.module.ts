import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { EditBranchResolver } from "./edit-branch.resolver";
import { EditBranchService } from "./edit-branch.service";

@Module({
  imports: [PrismaModule],
  providers: [EditBranchResolver, EditBranchService],
})
export class EditBranchModule {}
