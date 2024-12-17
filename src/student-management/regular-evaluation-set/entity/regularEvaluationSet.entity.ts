import { Int, ObjectType, Field } from "@nestjs/graphql";
import { Branch } from "@src/branch/entity/branch.entity";
import { Subject } from "@src/subject/entity/subject.entity";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@ObjectType()
export class RegularEvaluationSet {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  lectureId: number;
  @Field()
  statusType: string; // 구분
  @Field()
  evaluationDetails: string; //# 평가내용
  @Field(() => Int)
  points: number; // 점수 (배점)
  @Field(() => Subject, { nullable: true })
  Subject?: Subject;
  @Field(() => Int)
  subjectId: number;
  @Field(() => String)
  createdAt: Date;
  @Field(() => String)
  updatedAt: Date;
  @Field(() => Branch, { nullable: true })
  Branch?: Branch;
  @Field(() => Int, { nullable: true })
  branchId?: number;
  @Field()
  lastModifiedByUserId: string; // 직원아이디
  @Field()
  lastModifiedByName: string; //직원이름
  @Field(() => String, { nullable: true })
  lastModifiedTime?: Date; //최근수정시간
}
@ObjectType()
export class ResultSeeRegularEvaluationSet extends CommonResponse {
  @Field(() => [RegularEvaluationSet], { nullable: "itemsAndList" })
  data?: RegularEvaluationSet[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}
