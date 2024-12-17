import { ObjectType, Field, Int } from "@nestjs/graphql";
import { AdviceType } from "../../advice-type/entity/adviceType.entity";
import { StudentState } from "../../student-state/entity/studentState.entity";
import { ConsultationMemo } from "@src/student-state/consultation-memo/entity/consultationMemo.entity";
import { PermissionsGranted } from "../../permissions-granted/entity/permissionsGranted.entity";
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
