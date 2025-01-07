import { Field, InputType } from "@nestjs/graphql";
import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class CreateWorkBoardDto {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  writer: string;

  @Field({ nullable: true })
  @IsOptional()
  toTeam?: string;

  @Field({ nullable: true })
  @IsOptional()
  toPerson?: string;

  @Field({ nullable: true })
  @IsOptional()
  level?: string;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  workStatus?: string;

  @Field()
  @IsNotEmpty()
  detail: string;

  @Field({ nullable: true })
  @IsOptional()
  filePath?: string;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @IsOptional()
  lastModifiedTime?: Date;
}
