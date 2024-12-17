import { Resolver, Query, Int, Args, Context, Mutation } from "@nestjs/graphql";
import { SeeStudentService } from "./see-student.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { SeeStudentResult } from "@src/student/entity/student.entity";

@Resolver()
export class SeeStudentResolver {
  constructor(private readonly seeStudentService: SeeStudentService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => SeeStudentResult)
  async seeStudent(
    @Context() context: any,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
  ): Promise<SeeStudentResult> {
    return this.seeStudentService.seeStudentFunc(context, page, limit);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async doubleCheck(
    @Context() context: any,
    @Args("name") name: string,
    @Args("phoneNum1") phoneNum1: string,
  ): Promise<CommonResponse> {
    return this.seeStudentService.doubleCheckFunc(context, name, phoneNum1);
  }
}
