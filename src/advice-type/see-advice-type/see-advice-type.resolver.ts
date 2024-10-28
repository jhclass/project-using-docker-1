import { Query, Resolver, Int, Args, Context } from "@nestjs/graphql";
import { SeeAdviceTypeService } from "./see-advice-type.service";
import { ResultAdviceType } from "@src/result-dto/common-response.dto";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class SeeAdviceTypeResolver {
  constructor(private readonly seeAdviceService: SeeAdviceTypeService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => ResultAdviceType)
  async seeAdviceType(
    @Context() context: any,
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
    @Args("category", { nullable: true }) category?: string,
  ): Promise<ResultAdviceType> {
    return this.seeAdviceService.seeAdviceFunc(
      context,
      limit,
      page,
      category,
    ) as unknown as ResultAdviceType;
  }
}
