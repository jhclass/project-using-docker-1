import { ObjectType, Field, Int } from "@nestjs/graphql";
import { StudentState } from "./studentState.dto";
import { ManageUser } from "./manageUser.dto";
import { Branch } from "./branch.dto";
//상담메모
@ObjectType()
export class ConsultationMemo {
  @Field(() => Int)
  id: number;
  @Field()
  content: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => StudentState, { nullable: true })
  studentState?: StudentState;
  @Field(() => Int, { nullable: true })
  studentStateId?: number;
  @Field(() => ManageUser, { nullable: true })
  manageUser?: ManageUser;
  @Field(() => Int, { nullable: true })
  manageUserId?: number;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field({ nullable: true })
  lastModifiedTime?: string;
}
