import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { PermissionsGrantedService } from "./permissionsGranted.service";
import { PermissionsGranted } from "@src/result-dto/permissionsGranted.dto";
import { ManageUser } from "@src/result-dto/manageUser.dto";

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
