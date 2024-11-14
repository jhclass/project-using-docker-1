import { Args, Int, Mutation, Resolver, Context } from "@nestjs/graphql";
import { EditPermissionsGrantedService } from "./edit-permissions-granted.service";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class EditPermissionsGrantedResolver {
  constructor(
    private readonly editPermissionsGrantedService: EditPermissionsGrantedService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editPermissionsGranted(
    @Context() context: any,
    @Args("lastModifiedTime") lastModifiedTime: string,
    @Args("id", { type: () => Int }) id: number,
    @Args("manageUserIdsToConnect", {
      type: () => [Int],
      nullable: "itemsAndList",
    })
    manageUserIdsToConnect?: number[],
    @Args("manageUserIdsToDisconnect", {
      type: () => [Int],
      nullable: "itemsAndList",
    })
    manageUserIdsToDisconnect?: number[],
    @Args("smsPermitted", { nullable: true }) smsPermitted?: string,
    @Args("readOnly", { nullable: true }) readOnly?: string,
    @Args("allPermitted", { nullable: true }) allPermitted?: string,
    @Args("permissionName", { nullable: true }) permissionName?: string,

    @Args("topic", { nullable: true }) topic?: string,
  ): Promise<CommonResponse> {
    return this.editPermissionsGrantedService.editPermissionsGrantedFunc(
      context,
      lastModifiedTime,
      id,
      manageUserIdsToConnect,
      manageUserIdsToDisconnect,
      smsPermitted,
      readOnly,
      allPermitted,
      permissionName,
      topic,
    );
  }
}
