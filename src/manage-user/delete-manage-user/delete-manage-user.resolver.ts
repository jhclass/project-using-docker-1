import { Mutation, Resolver, Args, Int } from "@nestjs/graphql";
import { DeleteManageUserService } from "./delete-manage-user.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DeleteManageUserResolver {
  constructor(
    private readonly deleteManageUserService: DeleteManageUserService,
  ) {}
  @Mutation(() => CommonResponse)
  async deleteManageUser(@Args({ name: "id", type: () => Int }) id: number) {
    return this.deleteManageUserService.deleteManageUserFunc(id);
  }
}
