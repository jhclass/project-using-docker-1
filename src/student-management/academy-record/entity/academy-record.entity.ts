import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { StudentPayment } from "@src/student-payment/entity/studentPayment.entity";

@ObjectType()
export class ResultAcademyRecord extends CommonResponse {
  @Field(() => [StudentPayment], { nullable: "itemsAndList" })
  result?: StudentPayment[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
