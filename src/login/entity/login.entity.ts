import { Field, ObjectType } from "@nestjs/graphql";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@ObjectType()
export class ResultLogin extends CommonResponse {
  @Field({ nullable: true })
  token?: string;
  @Field({ nullable: true })
  refreshToken?: string;
}
