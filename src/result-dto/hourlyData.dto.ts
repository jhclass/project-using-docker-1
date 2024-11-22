import { Field, ObjectType, Int } from "@nestjs/graphql";

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
