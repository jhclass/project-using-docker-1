import { Resolver, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { DeleteStudentService } from "./delete-student.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class DeleteStudentResolver {
  constructor(private readonly deleteStudentService: DeleteStudentService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteStudent(
    @Context() context: any,
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteStudentService.deleteStudentFunc(context, id);
  }
}
