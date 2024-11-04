import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Branch } from "./branch.dto";
@ObjectType()
export class Alarm {
  @Field(() => Int)
  id: number;
  @Field()
  title: string;
  @Field()
  content: string;
  @Field(() => [Int], { nullable: true })
  personalTarget?: number[];
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
}
