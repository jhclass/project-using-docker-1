import { Field, InputType } from "@nestjs/graphql";
import { Matches } from "class-validator";

@InputType()
export class ValidateNumberDto {
  @Field()
  @Matches(/^01[016789]\d{7,8}$/, {
    message: "전화번호 형식이 유효하지 않습니다.",
  })
  phoneNum: string;
}
