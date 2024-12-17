import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { AdviceTypeService } from "./advice-type.service";
import { AdviceType } from "@src/advice-type/entity/adviceType.entity";
import { StudentState } from "@src/student-state/entity/studentState.entity";

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
