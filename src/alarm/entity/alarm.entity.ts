import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Branch } from "../../branch/entity/branch.entity";
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

@ObjectType()
export class ResultSeeAlarms {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [Alarm], { nullable: "itemsAndList" })
  data?: Alarm[];
  @Field({ nullable: true })
  totalCount?: number;
}
