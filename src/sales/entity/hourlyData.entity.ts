import { Field, ObjectType, Int } from "@nestjs/graphql";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@ObjectType()
export class HourlyData {
  @Field({ nullable: true })
  nowDate?: string;
  @Field({ nullable: true })
  cashOrCard?: string;
  @Field({ nullable: true })
  currentState?: string;
  @Field(() => Int, { nullable: true })
  amount?: number;
}

@ObjectType()
export class HourlySalesData extends CommonResponse {
  @Field(() => [HourlyData], { nullable: "itemsAndList" })
  hourlyDetails?: HourlyData[];
  @Field(() => Int, { nullable: true })
  hourlyTotalCard?: number;
  @Field(() => Int, { nullable: true })
  hourlyTotalCardRefund?: number;
  @Field(() => Int, { nullable: true })
  hourlyTotalCash?: number;
  @Field(() => Int, { nullable: true })
  hourlyTotalCashRefund?: number;
  @Field(() => Int, { nullable: true })
  thisTimeRefundTotal?: number;
  @Field(() => Int, { nullable: true })
  thisTimeAmountTotal?: number;
  @Field(() => Int, { nullable: true })
  thisTimeRealTotal?: number;
}
