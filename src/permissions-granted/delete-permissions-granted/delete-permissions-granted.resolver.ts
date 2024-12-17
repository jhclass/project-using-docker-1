import { UseGuards } from "@nestjs/common";
import { Int, Mutation, Resolver, Args } from "@nestjs/graphql";
import { DeletePermissionsGrantedService } from "./delete-permissions-granted.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DeletePermissionsGrantedResolver {
  constructor(
    private readonly deletePermissionsGrantedService: DeletePermissionsGrantedService,
  ) {}
  @UseGuards()
  @Mutation(() => CommonResponse)
  async deletePermissionsGranted(@Args("id", { type: () => Int }) id: number) {
    return this.deletePermissionsGrantedService.deletePErmissionsFunc(id);
  }
}
