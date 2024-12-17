import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ManageUser } from "@src/manage-user/entity/manageUser.entity";
import { Branch } from "@src/branch/entity/branch.entity";
import { CommonResponse } from "@src/common-entity/common-response.entity";

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
@ObjectType()
export class ResultSearchSms extends CommonResponse {
  @Field(() => [Sms], { nullable: "itemsAndList" })
  data?: Sms[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
