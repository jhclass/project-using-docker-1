import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CommonResponse } from "@src/common-entity/common-response.entity";
import { PaymentDetail } from "@src/payment-detail/entity/paymentDetail.entity";
@ObjectType()
export class ProcessingManagerGroupResult {
  @Field(() => Int, { nullable: true })
  receiverId?: number;
  @Field(() => Int, { nullable: true })
  totalAmount?: number;
  @Field(() => Int, { nullable: true })
  totalRefundAmount?: number;
  @Field(() => Int, { nullable: true })
  totalActualAmount?: number;
  @Field(() => Int, { nullable: true })
  totalPaymentCount?: number;
  @Field(() => Int, { nullable: true })
  totalRefundCount?: number;
}
@ObjectType()
export class SalesStatisticsResult extends CommonResponse {
  @Field(() => [ProcessingManagerGroupResult], { nullable: "itemsAndList" })
  data?: ProcessingManagerGroupResult[];
}

@ObjectType()
export class SalesStatisticsListResult extends CommonResponse {
  @Field(() => [PaymentDetail], { nullable: "itemsAndList" })
  paymentData?: [PaymentDetail];
  @Field(() => [PaymentDetail], { nullable: "itemsAndList" })
  refundData?: [PaymentDetail];
  @Field(() => Int, { nullable: true })
  receiverId?: number;
}
