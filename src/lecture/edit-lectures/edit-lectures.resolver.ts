import { UseGuards } from "@nestjs/common";
import { Mutation, Resolver, Args, Context, Int } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { EditLecturesService } from "./edit-lectures.service";

@Resolver()
export class EditLecturesResolver {
  constructor(private readonly editLecturesService: EditLecturesService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editLectures(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("lastModifiedTime")
    lastModifiedTime: string,
    @Args("campus", { nullable: true })
    campus?: string,
    @Args("temporaryName", { nullable: true })
    temporaryName?: string,
    @Args("subDiv", { nullable: true })
    subDiv?: string,
    @Args("teachersId", { type: () => [Int], nullable: "itemsAndList" })
    teachersId?: number[],
    @Args("roomNum", { nullable: true })
    roomNum?: string,
    @Args("subjectId", { type: () => Int, nullable: true })
    subjectId?: number,
    @Args("lecturePeriodStart", { nullable: true })
    lecturePeriodStart?: string,
    @Args("lecturePeriodEnd", { nullable: true })
    lecturePeriodEnd?: string,
    @Args("lectureDetails", { type: () => [String], nullable: "itemsAndList" })
    lectureDetails?: string[],
    @Args("lectureTime", { type: () => [String], nullable: "itemsAndList" })
    lectureTime?: string[],
    @Args("eduStatusReport", { nullable: true })
    eduStatusReport?: string,
    @Args("ApprovedNum", { type: () => Int, nullable: true })
    ApprovedNum?: number,
    @Args("confirmedNum", { type: () => Int, nullable: true })
    confirmedNum?: number,
    @Args("sessionNum", { type: () => Int, nullable: true })
    sessionNum?: number,
    @Args("timetableAttached", { nullable: true })
    timetableAttached?: string,
  ) {
    return this.editLecturesService.editLecturesFunc(
      context,
      id,
      lastModifiedTime,
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
