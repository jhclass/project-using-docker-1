import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ManageUser } from "@dto/table.dto";
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
