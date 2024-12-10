import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ManageUser } from "./manageUser.dto";
import { Branch } from "./branch.dto";

@ObjectType()
export class MessageStorage {
  @Field(() => Int)
  id: number;
  @Field(() => ManageUser, { nullable: true })
  manageUser?: ManageUser;
  @Field(() => Int, { nullable: true })
  manageUserId?: number;
  @Field()
  message: string;
  @Field()
  saveType: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
}
