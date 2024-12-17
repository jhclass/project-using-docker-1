import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ManageUser } from "../../../manage-user/entity/manageUser.entity";
import { Branch } from "../../../branch/entity/branch.entity";
import { CommonResponse } from "@src/common-entity/common-response.entity";

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
@ObjectType()
export class ResultMessageStorage extends CommonResponse {
  @Field(() => [MessageStorage], { nullable: "itemsAndList" })
  data?: MessageStorage[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
