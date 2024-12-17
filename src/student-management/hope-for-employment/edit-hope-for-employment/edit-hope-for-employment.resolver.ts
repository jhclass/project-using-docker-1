import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { EditHopeForEmploymentService } from "./edit-hope-for-employment.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class EditHopeForEmploymentResolver {
  constructor(
    private readonly editHopeForEmploymentService: EditHopeForEmploymentService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editHopeEmployment(
    @Context() context: any,
    @Args("id")
    id: number,
    @Args("fieldOfHope")
    fieldOfHope: string, //# 희망분야
    @Args("hopefulReward", { type: () => Int })
    hopefulReward: number, //# 희망보수(int!)
    @Args("workType")
    workType: string, //# 근무형태 : 정규,비정규
    @Args("workingHours", { type: () => Int })
    workingHours: number, //# 근무시간 (int)
    @Args("opinion")
    opinion: string, //# 의견
    @Args("lastModifiedTime")
    lastModifiedTime: string, //#최근수정시간
    @Args("workingArea", { nullable: true })
    workingArea?: string, //# 근무지역
  ) {
    return this.editHopeForEmploymentService.editHopeForEmploymentFunc(
      context,
      id,
      fieldOfHope,
      hopefulReward,
      workType,
      workingHours,
      opinion,
      lastModifiedTime,
      workingArea,
    );
  }
}
