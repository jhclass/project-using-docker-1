import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { EditEduInfomationService } from "./edit-edu-infomation.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class EditEduInfomationResolver {
  constructor(
    private readonly editInfomationService: EditEduInfomationService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editEduInfomation(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("lastModifiedTime")
    lastModifiedTime: string, //최근수정시간
    @Args("eduType", { nullable: true })
    eduType?: string, //학교타입
    @Args("eduName", { nullable: true })
    eduName?: string, //학교이름
    @Args("major", { nullable: true })
    major?: string, //전공
    @Args("graduationStatus", { nullable: true })
    graduationStatus?: string, //졸업여부
  ): Promise<CommonResponse> {
    return this.editInfomationService.editEduInfomationFunc(
      context,
      id,
      lastModifiedTime,
      eduType,
      eduName,
      major,
      graduationStatus,
    );
  }
}
