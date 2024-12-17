import { Resolver, Query, Args, Int, Context } from "@nestjs/graphql";
import { SeeStudentStateService } from "./see-student-state.service";
import { StudentStateResponse } from "@src/student-state/entity/studentState.entity";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class SeeStudentStateResolver {
  constructor(
    private readonly seeStudentStateService: SeeStudentStateService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => StudentStateResponse)
  async seeStudentState(
    @Context() context: any,
    @Args("page", { type: () => Int }) page: number,
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
  ): Promise<StudentStateResponse> {
    return this.seeStudentStateService.seeStudentStateFunc(
      context,
      page,
      limit,
    );
  }
}
