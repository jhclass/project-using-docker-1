import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { AdviceType, StudentState } from "@src/result-dto/table.dto";
import { AdviceTypeService } from "./advice-type.service";

@Resolver(() => AdviceType)
export class AdviceTypeResolver {
  constructor(private adviceTypeService: AdviceTypeService) {}
  @ResolveField(() => [StudentState])
  async StudentState(
    @Parent() adviceType: AdviceType,
  ): Promise<StudentState[]> {
    const { id } = adviceType;
    return this.adviceTypeService.adviceTypeFunc(id);
  }
}
