import { Resolver, Query, Context } from "@nestjs/graphql";
import { MMeService } from "./m-me.service";
import { ManageUser } from "@src/result-dto/table.dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { ResultIsMe } from "@src/result-dto/common-response.dto";

@Resolver()
export class MMeResolver {
  constructor(private readonly mMeService: MMeService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ManageUser)
  async mMe(@Context() context: any): Promise<ManageUser> {
    return this.mMeService.mMeFunc(context);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultIsMe)
  async isMme(@Context() context: any): Promise<ResultIsMe> {
    return this.mMeService.isMmeFunc(context);
  }
}
