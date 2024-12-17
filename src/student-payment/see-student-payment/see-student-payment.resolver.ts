import { Resolver, Query, Context, Args, Int } from "@nestjs/graphql";
import { SeeStudentPaymentService } from "./see-student-payment.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { StudentPaymentResult } from "@src/student-payment/entity/studentPayment.entity";

@Resolver()
export class SeeStudentPaymentResolver {
  constructor(
    private readonly seeStudentPaymentService: SeeStudentPaymentService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => StudentPaymentResult)
  async seeStudentPayment(
    @Context() context: any,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
    @Args("limit", { type: () => Int, nullable: true }) limit?: number,
  ) {
    return this.seeStudentPaymentService.seeStudentPaymentFunc(
      context,
      page,
      limit,
    );
  }
}
