import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ManageUser } from "./manageUser.dto";
import { Branch } from "./branch.dto";

@ObjectType()
export class Sms {
  @Field(() => Int)
  id: number;
  @Field()
  receiver: string;
  @Field()
  message: string;
  @Field(() => ManageUser, { nullable: true })
  manageUser?: ManageUser;
  @Field(() => Int, { nullable: true })
  manageUserId?: number;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field({ nullable: true })
  saveType?: string;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field({ nullable: true })
  rDate?: string;
  @Field({ nullable: true })
  rTime?: string;
  @Field({ nullable: true })
  successType?: string;
  @Field({ nullable: true })
  sender?: string;
  @Field({ nullable: true })
  failureReason?: string;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //최근수정시간
}