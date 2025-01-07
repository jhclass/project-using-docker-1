import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Branch } from "@src/branch/entity/branch.entity";

@ObjectType()
export class WorkBoard {
  @Field(() => Int)
  id: number;
  @Field()
  title: string;
  @Field()
  writer: string;
  @Field({ nullable: true })
  toTeam?: string;
  @Field({ nullable: true })
  toPerson?: string;
  @Field({ nullable: true })
  level?: string;
  @Field(() => String, { nullable: true })
  startDate?: Date;
  @Field(() => String, { nullable: true })
  endDate?: Date;
  @Field({ nullable: true })
  workStatus?: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field({ nullable: true })
  filePath?: string;
  @Field(() => Branch, { nullable: true })
  branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
}
