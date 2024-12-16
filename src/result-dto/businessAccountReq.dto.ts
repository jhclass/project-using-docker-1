import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@ObjectType()
export class BusinessAccountReq {
  @Field(() => Int)
  id: number;
  @Field()
  companyName: string;
  @Field()
  validate: string;
  @Field()
  @IsEmail({}, { message: "유효한 이메일 주소를 입력해주세요." })
  email: string;
  @Field(() => [String])
  filePath: string[];
  @Field()
  agree: string;
  @Field({ nullable: true })
  creationComplete?: string;
  @Field({ nullable: true })
  rejection?: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
}
