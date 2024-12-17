import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentState } from "../../student-state/entity/studentState.entity";
import { Branch } from "../../branch/entity/branch.entity";
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
  @Field(() => [StudentState], { nullable: "itemsAndList" })
  studentStates?: StudentState[];
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
}

@ObjectType()
export class ResultAdviceType {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [AdviceType], { nullable: "itemsAndList" })
  adviceType?: AdviceType[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
