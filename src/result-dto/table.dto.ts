import { ObjectType, Field, Int } from "@nestjs/graphql";
@ObjectType()
export class Branch {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  branchName?: string;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
}
@ObjectType()
export class ManageUser {
  @Field(() => Int)
  id: number;
  @Field()
  mUserId: string;
  @Field()
  mUsername: string;
  @Field()
  mPassword: string;
  @Field(() => Int, { nullable: true })
  mGrade?: number;
  @Field({ nullable: true })
  mRank?: string;
  @Field({ nullable: true })
  mPhoneNum?: string;
  @Field({ nullable: true })
  mPhoneNumCompany?: string;
  @Field({ nullable: true })
  mPhoneNumInside?: string;
  @Field({ nullable: true })
  mPhoneFriend?: string;
  @Field(() => [String], { nullable: true })
  mPart?: string[];
  @Field({ nullable: true })
  mAvatar?: string;
  @Field(() => String, { nullable: true })
  mJoiningDate?: Date;
  @Field({ nullable: true })
  mAddresses?: string;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field({ nullable: true })
  resign?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  mZipCode?: string;
  @Field({ nullable: true })
  mAddressDetail?: string;
  @Field(() => [Branch], { nullable: true })
  Branch?: Branch[];
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
}
