import { Int, Mutation, Resolver, Args } from "@nestjs/graphql";
import { EditAdviceTypeService } from "./edit-advice-type.service";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class EditAdviceTypeResolver {
  constructor(private editAdviceTypeService: EditAdviceTypeService) {}
  @Mutation(() => CommonResponse)
  async editAdviceType(
    @Args("id", { type: () => Int }) id: number,
    @Args("onOff", { nullable: true }) onOff?: string,
    @Args("category", { nullable: true }) category?: string,
    @Args("defaultValue", { nullable: true }) defaultValue?: string,
  ) {
    return this.editAdviceTypeService.editAdviceTypeFunc(
      id,
      onOff,
      category,
      defaultValue,
    );
  }
}
