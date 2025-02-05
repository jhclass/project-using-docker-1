import { Field, ObjectType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@ObjectType()
export class CommonResponse {
  @Field()
  ok: boolean;
  @Field({ nullable: true })
  @IsOptional()
  message?: string;
  @Field({ nullable: true })
  @IsOptional()
  error?: string;
}
