import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { CreateAdviceTypeService } from "./create-advice-type.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class CreateAdviceTypeResolver {
  constructor(
    private readonly createAdviceTypeService: CreateAdviceTypeService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createAdviceType(
    @Context() context: any,
    @Args("type") type: string,
    @Args("indexNum", { type: () => Int }) indexNum: number,
    @Args("category") category?: string,
    @Args("onOff", { nullable: true }) onOff?: string,
    @Args("defaultValue", { nullable: true }) defaultValue?: string,
  ): Promise<CommonResponse> {
    return this.createAdviceTypeService.createAdviceTypeFunc(
      context,
      type,
      indexNum,
      category,
      onOff,
      defaultValue,
    );
  }
}
