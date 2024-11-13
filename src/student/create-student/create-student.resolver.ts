import { Mutation, Resolver, Args, Context } from "@nestjs/graphql";
import { CreateStudentService } from "./create-student.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class CreateStudentResolver {
  constructor(private readonly createStudentService: CreateStudentService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createStudent(
    @Context() context: any,
    @Args("name", { nullable: true })
    name: string,
    @Args("phoneNum1", { nullable: true })
    phoneNum1: string,
    @Args("phoneNum2", { nullable: true })
    phoneNum2: string,
    @Args("smsAgreement", { nullable: true })
    smsAgreement: string,
    @Args("birthday", { nullable: true })
    birthday: string,
    @Args("department", { nullable: true })
    department: string,
  ): Promise<CommonResponse> {
    return this.createStudentService.createStudentFunc(
      context,
      name,
      phoneNum1,
      phoneNum2,
      smsAgreement,
      birthday,
      department,
    );
  }
}
