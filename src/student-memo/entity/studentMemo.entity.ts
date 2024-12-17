import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Student } from "@src/student/entity/student.entity";
import { ManageUser } from "@src/manage-user/entity/manageUser.entity";

//StudentMemo (수강생 메모)
@ObjectType()
export class StudentMemo {
  @Field(() => Int)
  id: number;
  @Field()
  content: string;
  @Field(() => Student, { nullable: true })
  student?: Student;
  @Field(() => Int, { nullable: true })
  studentId?: number;
  @Field(() => ManageUser, { nullable: true })
  manageUser?: ManageUser;
  @Field(() => Int, { nullable: true })
  manageUserId?: number;
  @Field(() => String, { nullable: true })
  createdAt?: Date;
  @Field(() => String, { nullable: true })
  updatedAt?: Date;
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date;
}
