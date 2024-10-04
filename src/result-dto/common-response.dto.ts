import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class CommonResponse {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message: string;
  @Field({ nullable: true })
  error: string;
}
