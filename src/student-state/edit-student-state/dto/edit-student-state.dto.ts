import { Field, InputType, Int } from "@nestjs/graphql";
import { IsArray, IsEmail, IsInt, IsOptional, IsString } from "class-validator";

@InputType()
export class EditStudentStateDto {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  campus?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  stName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNum1?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNum2?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNum3?: string;

  @Field(() => [String], { nullable: "itemsAndList" })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subject?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  detail?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  progress?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsEmail()
  stEmail?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  stAddr?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  subDiv?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  stVisit?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  expEnrollDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  perchase?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  birthday?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  pic?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  receiptDiv?: string;

  @Field(() => [Int], { nullable: "itemsAndList" })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  adviceTypes?: number[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastModifiedTime?: string;
}
