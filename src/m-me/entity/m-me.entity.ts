import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResultIsMe {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  message?: string;
  @Field({ nullable: true })
  error?: string;
}
