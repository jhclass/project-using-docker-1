import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ManageUser } from "../../manage-user/entity/manageUser.entity";
import { Branch } from "../../branch/entity/branch.entity";
//PermisionsGranted(권한)
@ObjectType()
export class PermissionsGranted {
  @Field(() => Int)
  id: number;
  @Field()
  permissionName: string;
  @Field({ nullable: true })
  topic: string;
  @Field(() => [ManageUser], { nullable: true })
  ManageUser?: ManageUser[];
  @Field({ nullable: true })
  smsPermitted: string;
  @Field({ nullable: true })
  readOnly: string;
  @Field({ nullable: true })
  allPermitted: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
}

@ObjectType()
export class ResultSearchPermissionsGranted {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [PermissionsGranted], { nullable: "itemsAndList" })
  data?: PermissionsGranted[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
