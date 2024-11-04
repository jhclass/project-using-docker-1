import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ManageUser } from "./manageUser.dto";
//Stamp (도장)
@ObjectType()
export class Stamp {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field(() => ManageUser, { nullable: true })
  Manager?: ManageUser;
  @Field(() => Int, { nullable: true })
  manageUserId?: number;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field({ nullable: true })
  imageUrl?: string;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //최근수정시간
}
