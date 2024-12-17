import { ObjectType } from "@nestjs/graphql";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@ObjectType()
export class DeleteFileResponse extends CommonResponse {}
