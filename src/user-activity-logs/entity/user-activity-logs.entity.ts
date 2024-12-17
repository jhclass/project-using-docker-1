import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Branch } from "../../branch/entity/branch.entity";

@ObjectType()
export class UserActivityLogs {
  @Field(() => Int)
  id: number;
  @Field()
  userId: string;
  @Field()
  eventName: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
}
@ObjectType()
export class UserActivityLogsResponse {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  message?: string;
  @Field(() => [UserActivityLogs], { nullable: "itemsAndList" })
  data?: UserActivityLogs[];
  @Field(() => Int, { nullable: true })
  totalCount: number;
}
