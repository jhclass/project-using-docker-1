import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResultRefreshToken {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  error?: string;
  @Field({ nullable: true })
  newAccessToken?: string;
}
