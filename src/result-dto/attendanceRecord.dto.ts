import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ManageUser } from "./manageUser.dto";
import { Branch } from "./branch.dto";

@ObjectType()
export class AttendanceRecord {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  clockIn: Date; //출근시간
  @Field(() => String, { nullable: true })
  clockOut?: Date; //퇴근시간
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => ManageUser)
  ManageUser: ManageUser;
  @Field(() => Int)
  manageUserId: number;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
}
