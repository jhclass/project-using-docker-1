import { ObjectType, Field, Int } from "@nestjs/graphql";
import { AdviceType, ManageUser, PermissionsGranted } from "@dto/table.dto";
@ObjectType()
export class CommonResponse {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class DeleteFileResponse {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class ResultLogin {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  token?: string;
  @Field({ nullable: true })
  refreshToken?: string;
}

@ObjectType()
export class ResultSeeManageUser {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [ManageUser], { nullable: true })
  result?: ManageUser[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class SearchManageUserResult {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  message?: string;
  @Field(() => [ManageUser], { nullable: true })
  result?: ManageUser[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class ResultRefreshToken {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  newAccessToken?: string;
}
@ObjectType()
export class ResultIsMe {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
export class ResultSearchPermissionsGranted {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [PermissionsGranted], { nullable: true })
  data?: PermissionsGranted[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@ObjectType()
export class ResultAdviceType {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
  @Field(() => [AdviceType], { nullable: true })
  adviceType?: AdviceType[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
