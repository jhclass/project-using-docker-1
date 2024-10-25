import { Args, Int, Mutation, Resolver, Context } from "@nestjs/graphql";
import { EditPermissionsGrantedService } from "./edit-permissions-granted.service";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class EditPermissionsGrantedResolver {
  constructor(
    private readonly editPermissionsGrantedService: EditPermissionsGrantedService,
  ) {}
  @Mutation(() => CommonResponse)
  async editPermissionsGranted(
    @Context() context: any,
    @Args("lastModifiedTime") lastModifiedTime: string,
    @Args("id", { type: () => Int }) id: number,
    @Args("permissionName") permissionName: string,
    @Args("topic") topic: string,
    @Args("manageUserIdsToConnect", { type: () => [Int], nullable: true })
    manageUserIdsToConnect?: number[],
    @Args("manageUserIdsToDisconnect", { type: () => [Int], nullable: true })
    manageUserIdsToDisconnect?: number[],
    @Args("smsPermitted", { nullable: true }) smsPermitted?: string,
    @Args("readOnly", { nullable: true }) readOnly?: string,
    @Args("allPermitted", { nullable: true }) allPermitted?: string,
  ): Promise<CommonResponse> {
    return this.editPermissionsGrantedService.editPermissionsGrantedFunc(
      context,
      lastModifiedTime,
      id,
      permissionName,
      topic,
      manageUserIdsToConnect,
      manageUserIdsToDisconnect,
      smsPermitted,
      readOnly,
      allPermitted,
    );
  }
}
