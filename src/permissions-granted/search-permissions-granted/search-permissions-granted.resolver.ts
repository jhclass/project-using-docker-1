import { Args, Context, Int, Query, Resolver } from "@nestjs/graphql";
import { SearchPermissionsGrantedService } from "./search-permissions-granted.service";
import { ResultSearchPermissionsGranted } from "@src/result-dto/common-response.dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class SearchPermissionsGrantedResolver {
  constructor(
    private readonly searchPermissionsGrantedService: SearchPermissionsGrantedService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultSearchPermissionsGranted)
  async searchPermissionsGranted(
    @Context() context: any,
    @Args("id", { type: () => Int, nullable: true }) id?: number,
    @Args("permissionName", { nullable: true }) permissionName?: string,
    @Args("topic", { nullable: true }) topic?: string,
    @Args("manageUserId", { type: () => Int, nullable: true })
    manageUserId?: number,
  ): Promise<ResultSearchPermissionsGranted> {
    return this.searchPermissionsGrantedService.searchPermissionsGrantedFunc(
      context,
      id,
      permissionName,
      topic,
      manageUserId,
    );
  }
}
