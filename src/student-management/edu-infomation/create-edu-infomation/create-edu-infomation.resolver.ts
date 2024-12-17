import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { CreateEduInfomationService } from "./create-edu-infomation.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateEduInfomationResolver {
  constructor(
    private readonly createEduInfomationService: CreateEduInfomationService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createEduInfomation(
    @Context() context: any,
    @Args("subjectId", { type: () => Int })
    subjectId: number, //과정id
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number, //수강증id
    @Args("eduType")
    eduType: string, //학교타입
    @Args("eduName")
    eduName: string, //학교이름
    @Args("graduationStatus")
    graduationStatus: string, //졸업여부
    @Args("major", { nullable: true })
    major?: string, //전공
  ): Promise<CommonResponse> {
    return this.createEduInfomationService.createEduInfomationFunc(
      context,
      subjectId,
      studentPaymentId,
      eduType,
      eduName,
      graduationStatus,
      major,
    );
  }
}
