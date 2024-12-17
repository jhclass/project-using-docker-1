import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ManageUser } from "../../manage-user/entity/manageUser.entity";
import { Branch } from "../../branch/entity/branch.entity";

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

@ObjectType()
export class ResultSearchAttendanceRecord {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [AttendanceRecord], { nullable: "itemsAndList" })
  result?: AttendanceRecord[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
