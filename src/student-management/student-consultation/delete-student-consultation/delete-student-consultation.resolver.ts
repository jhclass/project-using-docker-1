import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { DeleteStudentConsultationService } from "./delete-student-consultation.service";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class DeleteStudentConsultationResolver {
  constructor(
    private readonly deleteStudentConsultationService: DeleteStudentConsultationService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteStudentConsultation(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<CommonResponse> {
    return this.deleteStudentConsultationService.deleteStudentConsultationFunc(
      id,
    );
  }
}
