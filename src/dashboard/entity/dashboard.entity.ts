import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DashboardTodayResult {
  @Field({ nullable: true })
  ok?: boolean;
  @Field(() => Int, { nullable: true })
  today?: number;
  @Field(() => Int, { nullable: true })
  compareToday?: number;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class DashboardMonthResult {
  @Field({ nullable: true })
  ok?: boolean;
  @Field(() => Int, { nullable: true })
  month?: number;
  @Field(() => Int, { nullable: true })
  compareMonth?: number;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class DashboardUnpResult {
  @Field({ nullable: true })
  ok?: boolean;
  @Field(() => Int, { nullable: true })
  unpCount?: number;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}
@ObjectType()
export class DashboardATResult {
  @Field(() => [String], { nullable: "itemsAndList" })
  topFiveName?: string[];
  @Field(() => [Int], { nullable: true })
  count?: number[];
  @Field(() => Int, { nullable: true })
  totalStudentState?: number;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}
@ObjectType()
export class DashboardRDResult {
  @Field({ nullable: true })
  receiptDiv?: string;
  @Field(() => Int, { nullable: true })
  count?: number;
}
