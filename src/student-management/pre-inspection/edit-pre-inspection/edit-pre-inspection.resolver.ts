import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { EditPreInspectionService } from "./edit-pre-inspection.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class EditPreInspectionResolver {
  constructor(
    private readonly editPreInspectionService: EditPreInspectionService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editPreInspection(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("lastModifiedTime")
    lastModifiedTime: string, //최근수정시간
    @Args("dateOfPreInspection", { nullable: true })
    dateOfPreInspection: string, //사전점검일
    @Args("preScreenerType", { nullable: true })
    preScreenerType: string, // 사전검사구분 "강사","교무팀"
    @Args("preInspectionDetails", { nullable: true })
    preInspectionDetails: string, // 사전점검내용
    @Args("actionTaken", { nullable: true })
    actionTaken: string, //조치사항
  ): Promise<CommonResponse> {
    return this.editPreInspectionService.editPreInspectionFunc(
      context,
      id,
      lastModifiedTime,
      dateOfPreInspection,
      preScreenerType,
      preInspectionDetails,
      actionTaken,
    );
  }
}
