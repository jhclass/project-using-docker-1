import { Module } from "@nestjs/common";
import { CreateBranchModule } from "./create-branch/create-branch.module";
import { EditBranchModule } from "./edit-branch/edit-branch.module";
import { DeleteBranchModule } from "./delete-branch/delete-branch.module";

@Module({
  imports: [CreateBranchModule, EditBranchModule, DeleteBranchModule],
})
export class BranchModule {}
