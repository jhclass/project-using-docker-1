import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { ManageUser, PermissionsGranted } from "@src/result-dto/table.dto";
import { PermissionsGrantedService } from "./permissionsGranted.service";

@Resolver(() => PermissionsGranted)
export class PermissionsGrantedResolver {
  constructor(private permissionsGrantedService: PermissionsGrantedService) {}
  @ResolveField(() => [ManageUser])
  async ManageUser(
    @Parent() permissionsGranted: PermissionsGranted,
  ): Promise<ManageUser[]> {
    const { id } = permissionsGranted;
    return this.permissionsGrantedService.permissionsGrantedFunc(id);
  }
}
