import { Args, Mutation, Resolver, Context } from "@nestjs/graphql";
import { UpdateStudentStateResult } from "@src/student-state/entity/studentState.entity";
import { EditStudentStateService } from "./edit-student-state.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { EditStudentStateDto } from "./dto/edit-student-state.dto";

@Resolver()
export class EditStudentStateResolver {
  constructor(
    private readonly editStudentStateService: EditStudentStateService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => UpdateStudentStateResult)
  async updateStudentState(
    @Context() context: any,
    @Args("input") input: EditStudentStateDto,
  ): Promise<UpdateStudentStateResult> {
    return this.editStudentStateService.editStudentStateFunc(context, input);
  }
}
