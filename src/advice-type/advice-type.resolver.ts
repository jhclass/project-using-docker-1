import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { AdviceTypeService } from "./advice-type.service";
import { AdviceType } from "@src/result-dto/adviceType.dto";
import { StudentState } from "@src/result-dto/studentState.dto";

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
