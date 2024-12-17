import { Args, Mutation, Resolver, Int, Context } from "@nestjs/graphql";
import { EditStudentService } from "./edit-student.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class EditStudentResolver {
  constructor(private readonly editStudentService: EditStudentService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editStudent(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("name", { nullable: true })
    name?: string,
    @Args("phoneNum1", { nullable: true })
    phoneNum1?: string,
    @Args("phoneNum2", { nullable: true })
    phoneNum2?: string,
    @Args("smsAgreement", { nullable: true })
    smsAgreement?: string,
    @Args("birthday", { nullable: true })
    birthday?: string,
    @Args("lastModifiedTime", { nullable: true })
    lastModifiedTime?: string, //최근수정시간
  ): Promise<CommonResponse> {
    return this.editStudentService.editStudentFunc(
      id,
      name,
      phoneNum1,
      phoneNum2,
      smsAgreement,
      birthday,
      lastModifiedTime,
    );
  }
}
