import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentState } from "./studentState.dto";
import { Branch } from "./branch.dto";
//분야관리
@ObjectType()
export class AdviceType {
  @Field(() => Int)
  id: number;
  @Field()
  type: string;
  @Field(() => Int)
  indexNum: number;
  @Field({ nullable: true })
  category?: string;
  @Field({ nullable: true })
  onOff?: string;
  @Field({ nullable: true })
  defaultValue?: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => [StudentState], { nullable: true })
  studentStates?: StudentState[];
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
}
