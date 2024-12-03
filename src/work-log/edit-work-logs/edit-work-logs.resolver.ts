import { Mutation, Resolver, Args, Int, Context } from "@nestjs/graphql";
import { EditWorkLogsService } from "./edit-work-logs.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class EditWorkLogsResolver {
  constructor(private readonly editWorkLogsService: EditWorkLogsService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editWorkLogs(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("attendanceCount", { type: () => [Int], nullable: "itemsAndList" })
    attendanceCount: number[],
    @Args("lastModifiedTime")
    lastModifiedTime: string, //최근수정시간
    @Args("trainingInfoOne", { type: () => [String], nullable: "itemsAndList" })
    trainingInfoOne?: string[],
    @Args("trainingInfoTwo", { type: () => [String], nullable: "itemsAndList" })
    trainingInfoTwo?: string[],
    @Args("trainingInfoThree", {
      type: () => [String],
      nullable: "itemsAndList",
    })
    trainingInfoThree?: string[],
    @Args("trainingInfoFour", {
      type: () => [String],
      nullable: "itemsAndList",
    })
    trainingInfoFour?: string[],
    @Args("trainingInfoFive", {
      type: () => [String],
      nullable: "itemsAndList",
    })
    trainingInfoFive?: string[],
    @Args("trainingInfoSix", { type: () => [String], nullable: "itemsAndList" })
    trainingInfoSix?: string[],
    @Args("trainingInfoSeven", {
      type: () => [String],
      nullable: "itemsAndList",
    })
    trainingInfoSeven?: string[],
    @Args("trainingInfoEight", {
      type: () => [String],
      nullable: "itemsAndList",
    })
    trainingInfoEight?: string[],
    @Args("trainingTimeOneday", { type: () => [Int], nullable: "itemsAndList" })
    trainingTimeOneday?: number[],
    @Args("trainingTimeTotal", { type: () => [Int], nullable: "itemsAndList" })
    trainingTimeTotal?: number[],
    @Args("instruction", { nullable: true })
    instruction?: string,
    @Args("absentSt", { nullable: true })
    absentSt?: string,
    @Args("tardySt", { nullable: true })
    tardySt?: string,
    @Args("leaveEarlySt", { nullable: true })
    leaveEarlySt?: string,
    @Args("outingSt", { nullable: true })
    outingSt?: string,
    @Args("etc", { nullable: true })
    etc?: string,
    @Args("lecturesId", { type: () => Int, nullable: true })
    lecturesId?: number,
    @Args("workLogsDate", { nullable: true })
    workLogsDate?: string,
    @Args("checkList", { type: () => [String], nullable: "itemsAndList" })
    checkList?: string[],
    @Args("checkContext", { type: () => [String], nullable: "itemsAndList" })
    checkContext?: string[],
  ): Promise<CommonResponse> {
    return this.editWorkLogsService.editWorkLogsFunc(
      context,
      id,
      attendanceCount,
      lastModifiedTime,
      trainingInfoOne,
      trainingInfoTwo,
      trainingInfoThree,
      trainingInfoFour,
      trainingInfoFive,
      trainingInfoSix,
      trainingInfoSeven,
      trainingInfoEight,
      trainingTimeOneday,
      trainingTimeTotal,
      instruction,
      absentSt,
      tardySt,
      leaveEarlySt,
      outingSt,
      etc,
      lecturesId,
      workLogsDate,
      checkList,
      checkContext,
    );
  }
}
