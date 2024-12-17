import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { PermissionsGrantedService } from "./permissionsGranted.service";
import { PermissionsGranted } from "@src/permissions-granted/entity/permissionsGranted.entity";
import { ManageUser } from "@src/manage-user/entity/manageUser.entity";

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
