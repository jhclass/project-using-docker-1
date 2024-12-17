import { Resolver, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { CreateHopeForEmploymentService } from "./create-hope-for-employment.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateHopeForEmploymentResolver {
  constructor(
    private readonly createHopeForEmploymentService: CreateHopeForEmploymentService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createHopeForEmployment(
    @Context() context: any,
    @Args("workingArea")
    workingArea: string, // 근무지역
    @Args("fieldOfHope")
    fieldOfHope: string, // 희망분야
    @Args("hopefulReward", { type: () => Int })
    hopefulReward: number, // 희망보수(int!)
    @Args("workType")
    workType: string, // 근무형태 : 정규,비정규
    @Args("workingHours", { type: () => Int })
    workingHours: number, // 근무시간 (int)
    @Args("opinion")
    opinion: string, // 의견
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number,
    @Args("subjectId", { type: () => Int })
    subjectId: number,
  ) {
    return this.createHopeForEmploymentService.createHopeForEmploymentFunc(
      context,
      workingArea,
      fieldOfHope,
      hopefulReward,
      workType,
      workingHours,
      opinion,
      studentPaymentId,
      subjectId,
    );
  }
}
