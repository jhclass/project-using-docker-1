import { Int, Resolver, Args, Mutation, Context } from "@nestjs/graphql";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { ChangeOrderAtService } from "./change-order-at.service";

@Resolver()
export class ChangeOrderAtResolver {
  constructor(private readonly changeOrderAtService: ChangeOrderAtService) {}
  @Mutation(() => CommonResponse)
  async changeOrderAT(
    @Context() context: any,
    @Args("indexNums", { type: () => [Int], nullable: "itemsAndList" })
    indexNums?: number[],
    @Args("ids", { type: () => [Int], nullable: "itemsAndList" })
    ids?: number[],
  ): Promise<CommonResponse> {
    return this.changeOrderAtService.changeOrderAtFunc(context, indexNums, ids);
  }
}
