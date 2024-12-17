import { Context, Int, Mutation, Resolver, Args } from "@nestjs/graphql";
import { CreateLecturesService } from "./create-lectures.service";
import { UseGuards } from "@nestjs/common";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";

@Resolver()
export class CreateLecturesResolver {
  constructor(private readonly createLecturesService: CreateLecturesService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createLectures(
    @Context() context: any,
    @Args("campus")
    campus: string,
    @Args("temporaryName")
    temporaryName: string,
    @Args("subDiv")
    subDiv: string,
    @Args("teachersId", { type: () => [Int], nullable: "items" })
    teachersId: number[],
    @Args("roomNum")
    roomNum: string,
    @Args("subjectId", { type: () => Int })
    subjectId: number,
    @Args("lecturePeriodStart")
    lecturePeriodStart: string,
    @Args("lecturePeriodEnd")
    lecturePeriodEnd: string,
    @Args("lectureDetails", { type: () => [String], nullable: "items" })
    lectureDetails: string[],
    @Args("lectureTime", { type: () => [String], nullable: "items" })
    lectureTime: string[],
    @Args("eduStatusReport")
    eduStatusReport: string,
    @Args("ApprovedNum", { type: () => Int })
    ApprovedNum: number,
    @Args("confirmedNum", { type: () => Int })
    confirmedNum: number,
    @Args("sessionNum", { type: () => Int })
    sessionNum: number,
    @Args("timetableAttached", { type: () => String, nullable: true })
    timetableAttached?: string,
  ): Promise<CommonResponse> {
    return this.createLecturesService.createLecturesFunc(
      context,
      campus,
      temporaryName,
      subDiv,
      teachersId,
      roomNum,
      subjectId,
      lecturePeriodStart,
      lecturePeriodEnd,
      lectureDetails,
      lectureTime,
      eduStatusReport,
      ApprovedNum,
      confirmedNum,
      sessionNum,
      timetableAttached,
    );
  }
}
