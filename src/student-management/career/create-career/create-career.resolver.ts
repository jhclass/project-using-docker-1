import { Resolver, Mutation, Context, Args, Int } from "@nestjs/graphql";
import { CreateCareerService } from "./create-career.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class CreateCareerResolver {
  constructor(private readonly createCareerService: CreateCareerService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createCareer(
    @Context() context: any,
    @Args("careerDetails")
    careerDetails: string,
    @Args("subjectId", { type: () => Int })
    subjectId: number,
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number,
  ): Promise<CommonResponse> {
    return this.createCareerService.createCareerFunc(
      context,
      careerDetails,
      subjectId,
      studentPaymentId,
    );
  }
}
