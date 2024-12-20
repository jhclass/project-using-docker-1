import { Field, InputType, Int } from "@nestjs/graphql";
import { IsArray, IsEmail, IsInt, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateStudentStateDto {
  @Field()
  @IsString()
  agreement: string;

  @Field(() => Int)
  @IsInt()
  progress: number;

  @Field(() => [Int], { nullable: "items" })
  @IsOptional()
  @IsArray()
  adviceTypes?: number[];

  @Field(() => [String], { nullable: "items" })
  @IsOptional()
  @IsArray()
  subject?: string[];

  @Field({ nullable: true })
  @IsOptional()
  stName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNum1?: string;

  @Field({ nullable: true })
  @IsOptional()
  campus?: string;

  @Field({ nullable: true })
  detail?: string;

  @Field({ nullable: true })
  @IsOptional()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  phoneNum2?: string;

  @Field({ nullable: true })
  @IsOptional()
  phoneNum3?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: "유효하지 않은 이메일 입니다." })
  stEmail?: string;

  @Field({ nullable: true })
  @IsOptional()
  stAddr?: string;

  @Field({ nullable: true })
  @IsOptional()
  stVisit?: string;

  @Field({ nullable: true })
  @IsOptional()
  subDiv?: string;

  @Field({ nullable: true })
  @IsOptional()
  expEnrollDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  perchase?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  birthday?: string;

  @Field({ nullable: true })
  @IsOptional()
  receiptDiv?: string;

  @Field({ nullable: true })
  @IsOptional()
  pic?: string;

  @Field(() => [String], { nullable: "itemsAndList" })
  @IsOptional()
  @IsArray()
  classMethod?: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  branchId?: number;

  @Field(() => [String], { nullable: "itemsAndList" })
  @IsOptional()
  @IsArray()
  today?: string[];
}
