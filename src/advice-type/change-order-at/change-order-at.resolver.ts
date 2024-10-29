import { Int, Resolver, Args, Mutation, Context } from "@nestjs/graphql";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { ChangeOrderAtService } from "./change-order-at.service";

@Resolver()
export class ChangeOrderAtResolver {
  constructor(private readonly changeOrderAtService: ChangeOrderAtService) {}
  @Mutation(() => CommonResponse)
  async changeOrderAT(
    @Context() context: any,
    @Args("indexNums", { type: () => [Int] }) indexNums: number[],
    @Args("ids", { type: () => [Int], nullable: true }) ids?: number[],
  ): Promise<CommonResponse> {
    return this.changeOrderAtService.changeOrderAtFunc(context, indexNums, ids);
  }
}