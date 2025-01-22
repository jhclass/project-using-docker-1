import { Args, Mutation, Resolver, Int, Context } from "@nestjs/graphql";
import { CreatePermissionsGrantedService } from "./create-permissions-granted.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class CreatePermissionsGrantedResolver {
  constructor(
    private readonly createPermissionsGrantedService: CreatePermissionsGrantedService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createPermissionGranted<CommonResponse>(
    @Context() context: any,
    @Args("permissionName") permissionName: string,
    @Args("topic") topic: string,
    @Args("manageUserIds", { type: () => [Int], nullable: "itemsAndList" })
    manageUserIds?: number[],
    @Args("smsPermitted", { nullable: true }) smsPermitted?: string,
    @Args("readOnly", { nullable: true }) readOnly?: string,
    @Args("allPermitted", { nullable: true }) allPermitted?: string,
  ) {
    return this.createPermissionsGrantedService.createPermissionsGrantedFunc(
      context,
      permissionName,
      topic,
      manageUserIds,
      smsPermitted,
      readOnly,
      allPermitted,
    );
  }
}
