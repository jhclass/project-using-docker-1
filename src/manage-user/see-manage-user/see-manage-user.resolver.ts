import { Int, Resolver, Args, Context, Query } from "@nestjs/graphql";
import { SeeManageUserService } from "./see-manage-user.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { ResultSeeManageUser } from "@src/result-dto/common-response.dto";

@Resolver()
export class SeeManageUserResolver {
  constructor(private seeManageUserService: SeeManageUserService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultSeeManageUser)
  async seeManageUser(
    @Context() context: any,
    @Args({ name: "limit", type: () => Int, nullable: true }) limit?: number,
    @Args({ name: "page", type: () => Int, nullable: true }) page?: number,
    @Args("resign", { nullable: true }) resign?: string,
  ): Promise<ResultSeeManageUser> {
    //console.log("context:", context);
    //const { user } = context.req;
    //console.log(user);
    return this.seeManageUserService.seeManageUserFunc(
      context,
      limit,
      page,
      resign,
    );
  }
}
