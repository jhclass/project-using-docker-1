import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeleteSubjectService } from "./delete-subject.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class DeleteSubjectResolver {
  constructor(private readonly deleteSubjectService: DeleteSubjectService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteSubject(@Args("id", { type: () => Int }) id: number) {
    return this.deleteSubjectService.deleteSubjectFunc(id);
  }
}
