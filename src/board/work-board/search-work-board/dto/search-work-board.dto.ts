import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsOptional, IsString } from "class-validator";

@InputType()
export class SearchWorkBoardDto {
  @Field(() => Int, { nullable: true })
  @IsInt({ message: `id는 정수(Int) 타입이어야 합니다.` })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  writer?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  toTeam?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  toPerson?: string;

  @Field(() => [String], { nullable: "itemsAndList" })
  workPeriod?: Date[];

  @Field(() => String, { nullable: true })
  workStatus?: string;

  @Field(() => Int, { nullable: true })
  @IsInt({ message: `id는 정수(Int) 타입이어야 합니다.` })
  @IsOptional()
  page?: number;

  @Field(() => Int, { nullable: true })
  @IsInt({ message: `id는 정수(Int) 타입이어야 합니다.` })
  @IsOptional()
  limit?: number;
}
