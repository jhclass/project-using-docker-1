import { ObjectType, Field, Int } from "@nestjs/graphql";
import { AdviceType } from "./adviceType.dto";
import { StudentState } from "./studentState.dto";
import { ConsultationMemo } from "./consultationMemo.dto";
import { PermissionsGranted } from "./permissionsGranted.dto";
@ObjectType()
export class Branch {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  branchName?: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
  @Field(() => [AdviceType], { nullable: true })
  AdviceType?: AdviceType[];
  @Field(() => [StudentState], { nullable: true })
  StudentState?: StudentState[];
  @Field(() => [ConsultationMemo], { nullable: true })
  ConsultationMemo?: ConsultationMemo[];
  @Field(() => [PermissionsGranted], { nullable: true })
  PermissionsGranted?: PermissionsGranted[];
}
