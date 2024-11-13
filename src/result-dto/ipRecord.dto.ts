import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class IpRecord {
  @Field(() => Int)
  id: number;
  @Field()
  ipRecord: string;
  @Field()
  allowed: string; //허용비허용
  @Field({ nullable: true })
  details: string; //상세설명(필요시)
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
}
