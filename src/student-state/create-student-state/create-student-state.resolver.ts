import { Args, Resolver, Mutation, Context } from "@nestjs/graphql";
import { CreateStudentStateService } from "./create-student-state.service";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CreateStudentStateDto } from "./dto/create-student-state.dto";
import { Throttle } from "@src/public-decorator/throttle.decorator";

@Resolver()
export class CreateStudentStateResolver {
  constructor(
    private readonly createStudentStateService: CreateStudentStateService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Throttle({
    count: 5,
    unit: "minute",
  })
  @Mutation(() => CommonResponse)
  async createStudentState(
    @Context() context: any,
    @Args("input") input: CreateStudentStateDto,
  ): Promise<CommonResponse> {
    //logger.log(`branchId: ${branchId}`);
    return this.createStudentStateService.createStudentStateFunc(
      context,
      input,
    );
  }
}
